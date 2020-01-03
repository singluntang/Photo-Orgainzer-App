import { SNSHandler, SNSEvent, S3Event } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
const Jimp = require('jimp')


var AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS)
//const docClient = new XAWS.DynamoDB.DocumentClient()
const s3 = new XAWS.S3({
  signatureVersion: 'v4',
  region: 'us-east-2'
});

const imagesBucketName = process.env.IMAGES_S3_BUCKET
const thumbnailBucketName = process.env.THUMBNAILS_S3_BUCKET

export const handler: SNSHandler = async (event: SNSEvent) => {
  console.log('Processing SNS event ', JSON.stringify(event))
  for (const snsRecord of event.Records) {
    const s3EventStr = snsRecord.Sns.Message
    console.log('Processing S3 event', s3EventStr)
    const s3Event = JSON.parse(s3EventStr)

    await processImage(s3Event)    
  }
 }

 async function processImage(s3Event: S3Event) {
  for (const record of s3Event.Records) {
    let key = record.s3.object.key
    //key = '986a6062-c2cc-44ff-85cb-b4898dae6167'

    const data = await s3.getObject({
      Bucket: imagesBucketName,
      Key: key
    }).promise;      

    const body = data.Body

    console.log("Original buffer: ",body)
   
    await Jimp.read(body)
    .then(image => {
        return image
        .resize(150, Jimp.AUTO) // resize
        .getBufferAsync(Jimp.AUTO)
    }).then(resizedImage => {      
      s3.putObject(
        {
          Bucket: thumbnailBucketName,
          Key: `${key}.jpeg`,
          Body: resizedImage
        }, 
        function(err, data){
        if (err) { 
          console.log('Error uploading data: ', data); 
        } else {
          console.log('succesfully uploaded the resized image!');
        }
    })
    })
    .catch(err => {
      // Handle an exception.
      console.log('Error', err)
    }).promise
    
  }
}
