import sequelize from '../database/models/sequelize';

export default class TaxService {
  static async getTaxById(taxId) {
    const sql = `SELECT * FROM tax WHERE tax_id = ${taxId}`;

    const result = await sequelize.query(sql, { raw: true });

    return result[0];
  }
}
