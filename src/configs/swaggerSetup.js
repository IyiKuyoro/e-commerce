import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      title: 'Shopmate API Docs',
      version: '1.0.0',
      description: 'This documentation contains all the endpoints currently available on Shopmate',
    },
    host: 'iyikuyoro-commerce.herokuapp.com',
    basePath: '/api/v1',
  },
  apis: ['./docs/**/*.yml'],
};

export default swaggerJSDoc(options);
