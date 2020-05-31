/** Linter throwing errors Defined but never used */
module.exports = async (fastify, opts) => {
  fastify.get('/', async (request, reply) => ({ root: true }));
};
