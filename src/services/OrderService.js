import sequelize from '../database/models/sequelize';

export default class OrderService {
  static async createOrder(cartId, customerId, shippingId, taxId) {
    const sql = `CALL shopping_cart_create_order("${cartId}", ${customerId}, ${shippingId}, ${taxId})`;

    const result = await sequelize.query(sql, { raw: true });

    return result;
  }

  /**
   * @description Get a short details of an order
   */
  static async getShortDetails(orderId) {
    const sql = `CALL orders_get_order_short_details(${orderId})`;

    const result = await sequelize.query(sql, { raw: true });

    return result[0];
  }
}
