const ErrorList = require('../routes/enums/ErrorList');


module.exports = (fastify) => {
  fastify
    .setErrorHandler((error, request, reply) => {
      const { statusCode } = reply.res;
      const code = statusCode >= 400 ? statusCode : 500;
      if (code === 500) {
        request.log.error(error);
        reply.send(new Error('Something went wrong'));
      } else {
        request.log.warn(error);
        const { message } = error;
        const response = ErrorList[message];
        reply
          .code(code)
          .send(response ? { statusCode: code, ...response } : error);
      }
    });
};
