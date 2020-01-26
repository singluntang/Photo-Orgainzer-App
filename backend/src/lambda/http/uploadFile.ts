const express = require('express');
const awsServerlessExpress = require('aws-serverless-express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const binaryMimeTypes = [
  'image/gif',
  'text/css',
  'text/html'
];
const app = new express();

app.use(awsServerlessExpressMiddleware.eventContext());
app.set('view engine', 'html');

app.use('/', express.static('dist', {index: false}));

app.get('/', (req,res) => {
    res.sendFile('car2.jpeg', { root: "../../images" });
});

const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

module.exports.express = (event, context) => awsServerlessExpress.proxy(server, event, context);
