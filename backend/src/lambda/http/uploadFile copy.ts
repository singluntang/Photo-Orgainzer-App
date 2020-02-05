import { uploadFile } from '../../businessLogic/udagram'
const express = require('express');
const awsServerlessExpress = require('aws-serverless-express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
import { createLogger } from '../../utils/logger'

const logger = createLogger('uploadFile')

const binaryMimeTypes = [
  'image/jpeg'
];
const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());

logger.info("Message", {"Statement": "Out side"})

app.put('/image/:imageId', async (req,res, next) => {

  try {

     //const jsonData = req.apiGateway.event.body.toJSON()

     await uploadFile(req.apiGateway.event.pathParameters.imageId,req.apiGateway.event.body)  

     res.send(JSON.stringify({
         status: true
        }))

  } catch (error) {
      next(error)
  }
    
});

const server = awsServerlessExpress.createServer(app,null,binaryMimeTypes)

exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }
