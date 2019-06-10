import sequelize from '../database/models/sequelize';

export default class UserService {
  static async addUser(name, email, password) {
    const sql = `CALL customer_add("${name}", "${email}", "${password}");`;
    const newUser = await sequelize.query(sql, { raw: false });

    if (!newUser.length > 0) {
      throw new Error('Could not create new customer');
    }

    return newUser[0];
  }
}
