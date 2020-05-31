const getRatingsByProductIdSchema = {
  tags: ['Ratings'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', minimum: 1, maximum: 999999999 },
    },
    additionalProperties: false,
  },
  response: {
    '2xx': {
      type: 'object',
      properties: {
       productId: { type: 'integer' },
       averageRating:{type:'number'},
       categoryRating:{
        type: 'array',
        items: {
          type: 'object',
          properties: {
            category:{type:'number'},
            count:{type:'number'}
          },
        },
       }
      },
    },
  },
};



module.exports = {
  getRatingsByProductIdSchema
};
