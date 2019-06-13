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

  /**
   * @description Gets products from the database by department
   * @param  {number} departmentId The department identification
   * @param  {number} page The page number. default = 1
   * @param  {number} limit The limit of products on page. default = 20
   * @param  {number} descriptionLength The description length of each product. default = 200
   */
  static async getProductsByDepartment(departmentId, page = 1, limit = 20, descriptionLength = 200) {
    const startAt = limit * (page - 1);

    const sql = `
      CALL catalog_get_products_on_department("${departmentId}", "${descriptionLength}", "${limit}", "${startAt}")
    `;

    const results = await sequelize.query(sql, { raw: true });

    return results;
  }

  /**
   * @description Count the products by department
   * @param  {number} departmentId The department identification
   */
  static async countProductsByDepartment(departmentId) {
    const sql = `
      CALL catalog_count_products_on_department("${departmentId}");
    `;

    const results = await sequelize.query(sql, { raw: true });

    return results[0].products_on_department_count;
  }

  /**
   * @description Gets all the products in a category
   * @param  {} categoryId The category identification
   * @param  {number} page The page number. default = 1
   * @param  {number} limit The limit of products on page. default = 20
   * @param  {number} descriptionLength The description length of each product. default = 200
   */
  static async getProductsByCategory(categoryId, page = 1, limit = 20, descriptionLength = 200) {
    const startAt = limit * (page - 1);

    const sql = `
      CALL catalog_get_products_in_category("${categoryId}", "${descriptionLength}", "${limit}", "${startAt}")
    `;

    const results = await sequelize.query(sql, { raw: true });

    return results;
  }

  /**
   * @description Count the products by category
   * @param  {number} categoryId The category identification
   */
  static async countProductsByCategory(categoryId) {
    const sql = `
      CALL catalog_count_products_in_category("${categoryId}");
    `;

    const results = await sequelize.query(sql, { raw: true });

    return results[0].products_on_category_count;
  }
}
