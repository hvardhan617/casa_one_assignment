const WebService = require('./routes/ratings/service');

// Connects to the Postgres instance
const connectToDatabase = async fastify => fastify
  .register(require('fastify-postgres'), {
    connectionString: process.env.DB_URI,
    connectionTimeoutMillis: 10000,
  });


const decorateFastifyInstance = async (fastify) => {
  const {
    pg
  } = fastify;

  const ratingsService = new RatingsService(pg);
  fastify.decorate('ratingService', ratingsService);

};

module.exports = {
  connectToDatabase,
  decorateFastifyInstance,
};
