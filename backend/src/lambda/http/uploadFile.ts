const express = require('express');
const awsServerlessExpress = require('aws-serverless-express');
import { createLogger } from '../../utils/logger'
import * as fs from 'fs'
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

const logger = createLogger('uploadFile')

const binaryMimeTypes = [
  'image/jpeg'
];
const app = express();
const bucketName = process.env.IMAGES_S3_BUCKET

app.post('/imageUpload/:imageId', upload.single('imageFile'), function (req, res, next) {
  // req.file is the `avatar` file
  const fileName: string = `${req.event.pathParameters.imageId}.jpeg`
  logger.info('file name', {fileName: upload.fileName});
  // destination.txt will be created or overwritten by default.
 /* fs.copyFile(`${upload.path}/${upload.fileName}`, `/tmp/${bucketName}/${fileName}`, (err) => {
    if (err) {
      logger.info("ERROR UPLOAD", {err});
    }
  
    logger.info('File Upload', {Status: "Success!"});
    res.send(JSON.stringify({
      status: true
      }))      
  }) */
})

const server = awsServerlessExpress.createServer(app,null,binaryMimeTypes)

exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }