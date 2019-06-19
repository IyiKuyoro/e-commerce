import ResponseHelper from '../helpers/ResponseHelper';
import OrderService from '../services/OrderService';
import RedisClient from '../helpers/RedisClient';

export default class OrderController {
  static async createNewOrder(req, res) {
    try {
      const result = await OrderService.createOrder(
        req.cookies.cartId,
        req.userData.id,
        req.body.shippingId,
        req.body.taxId,
      );

      RedisClient.del(`cart:${req.cookies.cartId}`);

      ResponseHelper.successWithData(result[0], res);
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }
}
