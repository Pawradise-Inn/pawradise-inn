const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerApp = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Pawradise Inn API',
      version: '1.0.0',
      description: 'API documentation for Pawradise Inn'
    },
    servers: [
      {
        url: 'http://localhost:5000'
      },
    ],
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
swaggerApp.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const PORT = 5000;
swaggerApp.listen(PORT, () => {
  console.log(`Swagger docs running at http://localhost:${PORT}`);
});
