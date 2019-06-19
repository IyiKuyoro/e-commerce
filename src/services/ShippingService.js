import sequelize from '../database/models/sequelize';

export default class ShippingService {
  static async getRegions() {
    const url = 'SELECT * FROM shipping_region';

    const result = await sequelize.query(url);

    return result[0];
  }

  static async getShippingDetails(regionId) {
    const url = `SELECT * FROM shipping WHERE shipping_region_id = ${regionId}`;

    const result = await sequelize.query(url);

    return result[0];
  }
}
