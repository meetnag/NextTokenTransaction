const { version } = require('../../package.json');
// const config = require('../config/config');
//     // url: `http://localhost:${config.port}/v1`,
const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'NFT APP API',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com',
    },
  },
  servers: [
    {
      url: `http://localhost:3000/v1`,
    },
  ],
};

module.exports = swaggerDef;
