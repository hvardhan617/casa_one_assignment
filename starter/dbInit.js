const fp = require('fastify-plugin');
const {
  connectToDatabase, decorateFastifyInstance,
} = require('../registration');

module.exports = (fastify) => {
  fastify.register(fp(connectToDatabase))
    .register(fp(decorateFastifyInstance));
};
