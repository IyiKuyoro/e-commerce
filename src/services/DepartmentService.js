import sequelize from '../database/models/sequelize';

export default class DepartmentService {
  /**
   * @description Get list of departments in the database
   */
  static async getDepartmentList() {
    const results = await sequelize.query(`
      CALL catalog_get_departments_list()
    `);

    return results;
  }
}
