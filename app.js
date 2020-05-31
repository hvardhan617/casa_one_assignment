
const path = require('path');
const hyperid = require('hyperid');
const qs = require('qs');
const Ajv = require('ajv');

const instance = hyperid();


const ajv = new Ajv({
  // the fastify defaults (if needed)
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  nullable: true,
  // any other options
  // ...
});


// Add all the required modules from the ajv-keywords package here
require('ajv-keywords')(ajv, ['transform', 'formatMinimum', 'formatMaximum']);

module.exports = async (fastify, opts) => {
  // initializing error handler
  require('./starter/initErrorHandler')(fastify);
  fastify
    // For custom ajv schema options
    .setSchemaCompiler(schema => ajv.compile(schema))
    // Place here your custom code!
    .register(require('fastify-cors'), {
      // origin: ['https://marsplay.co', /\.marsplay\.co$/],
      /** @todo: change this to final url */
      origin: '*',
      methods: ['GET', 'POST'],
    })
    .register(require('fastify-helmet'))
    .register(require('fastify-sensible'), { errorHandler: false })
  // initializes all db instances
  require('./starter/dbInit.js')(fastify);
  // This loads all routes
  require('./starter/initRoutes')(fastify);
};

module.exports.options = {
  genReqId: () => instance(),
  querystringParser: str => qs.parse(str, { arrayLimit: 1000 }),
};
