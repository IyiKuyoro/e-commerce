import sequelize from '../database/models/sequelize';

export default class ProductServices {
  /**
   * @description Gets products from the database
   * @param  {number} page The page number. default = 1
   * @param  {number} limit The limit of products on page. default = 20
   * @param  {number} descriptionLength The description length of each product. default = 200
   */
  static async getProducts(page = 1, limit = 20, descriptionLength = 200) {
    const startAt = limit * (page - 1);

    const results = await sequelize.query(
      `CALL catalog_get_products_on_catalog(${descriptionLength}, ${limit}, ${startAt});`,
      { raw: true },
    );

    return results;
  }

  /**
   * @description Get the number of products in the database.
   */
  static async getProductsCounts() {
    const result = await sequelize.query('CALL catalog_count_products_on_catalog()', { raw: true });

    return result[0].products_on_catalog_count;
  }
}
