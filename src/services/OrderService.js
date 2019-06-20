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

  static async payOrder(orderId) {
    const sql = `CALL orders_update_status(${orderId}, 1)`;

    await sequelize.query(sql, { raw: true });
  }

  /**
   * @description get customer order's
   * @param  {number} customerId
   */
  static async getOrders(customerId) {
    const sql = `CALL orders_get_by_customer_id(${customerId})`;

    const result = await sequelize.query(sql, { raw: true });

    return result;
  }
}
