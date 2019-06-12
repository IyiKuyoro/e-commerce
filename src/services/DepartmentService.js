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

  /**
   * @description Get list of department details
   * @param   {number} departmentId The department identification
   */
  static async getDepartmentDetails(departmentId) {
    const results = await sequelize.query(`
      CALL catalog_get_department_details("${departmentId}");
    `);

    return results;
  }
}
