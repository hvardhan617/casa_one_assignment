/* eslint-disable no-loop-func */
const {
 getRatingsByProductIdSchema
} = require('./schema');


async function getRatingsForProduct(request){
  const { id } = request.params;
  request.log.debug('Requested Post ID:', id);
  const rating = await this.ratingService.getProductRatingById(id);
  this.assert(rating, 404);
  return rating;
}



module.exports = async (fastify, opts) => {
  fastify
    .get(
      '/product/:id',
      { schema: getRatingsByProductIdSchema },
      getRatingsForProduct,
    )
}
module.exports[Symbol.for('plugin-meta')] = {
  decorators: {
    fastify: [ 'ratingService','assert'],
  },
};
