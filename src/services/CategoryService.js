import sequelize from '../database/models/sequelize';

export default class CategoryService {
  /**
   * @description Get a the list of categories
   */
  static async getCategories(departmentId) {
    const results = await sequelize.query(`
      CALL catalog_get_categories_list("${departmentId}");
    `);

    return results;
  }

  /**
   * @description Get list of department details
   * @param   {number} categoryId The category identification
   */
  static async getCategoryDetails(categoryId) {
    const results = await sequelize.query(`
      CALL catalog_get_category_details("${categoryId}");
    `);

    return results;
  }
}
