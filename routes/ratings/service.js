class RatingService {
  constructor(pg) {
    this.pg = pg;
  }

  async getProductRatingById(productId){
    const client = await this.pg.connect();
    const response = {};
    try{
    const { rows } = await client.query(
      'select average_rating as averageRating,rating_5,rating_4,rating_3,rating_2,rating_1 from product_ratings where product_id = $1',[productId],
    );
    if(rows.length === 1){
      response.averageRating = rows[0].averageRating;
      const categories = [];
      const cat_five = {
        category:'five',
        count: rows[0].rating_5
      };
      const cat_four = {
        category:'four',
        count: rows[0].rating_4
      };
      const cat_three = {
        category:'three',
        count: rows[0].rating_3
      };
      const cat_two = {
        category:'two',
        count: rows[0].rating_2
      };
      const cat_one = {
        category:'one',
        count: rows[0].rating_1
      }
      categories.push(cat_five,cat_four,cat_three,cat_two,cat_one);
    }
    response.categoryRating = categories;
    }catch(e){
      console.error("Error occured while fetching rating"+e);
    }finally{
      client.release();
    }
    return response;
  }

 
}

module.exports = RatingService;
