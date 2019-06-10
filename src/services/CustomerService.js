import sequelize from '../database/models/sequelize';

export default class CustomerService {
  /**
   * @description This method adds a new customer to the database
   * @param  {} name
   * @param  {} email
   * @param  {} password
   */
  static async addCustomer(name, email, password) {
    const sql = `CALL customer_add("${name.trim()}", "${email.trim()}", "${password.trim()}");`;
    const newUser = await sequelize.query(sql, { raw: false });

    if (!newUser.length > 0) {
      throw new Error('Could not create new customer');
    }

    return newUser[0];
  }

  /**
   * @description This method gets the user's login info
   * @param  {} email
   */
  static async getLoginInfo(email) {
    const sql = `CALL customer_get_login_info("${email}");`;
    const user = await sequelize.query(sql, { raw: false });

    return user[0];
  }
}
