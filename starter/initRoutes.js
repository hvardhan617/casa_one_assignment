module.exports = (fastify) => {
  fastify.register(require('../routes/root'))
    .register(require('../routes/ratings'), { prefix: '/ratings' })
};
