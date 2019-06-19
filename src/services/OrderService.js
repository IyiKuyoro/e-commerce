import sequelize from '../database/models/sequelize';

export default class OrderService {
  static async createOrder(cartId, customerId, shippingId, taxId) {
    const sql = `CALL shopping_cart_create_order("${cartId}", ${customerId}, ${shippingId}, ${taxId})`;

    const result = await sequelize.query(sql, { raw: true });

    return result;
  }
}
