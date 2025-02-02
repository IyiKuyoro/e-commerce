import ResponseHelper from '../helpers/ResponseHelper';
import OrderService from '../services/OrderService';
import RedisClient from '../helpers/RedisClient';
import AppError from '../helpers/AppError';

export default class OrderController {
  static async createNewOrder(req, res) {
    try {
      const result = await OrderService.createOrder(
        req.headers.cartid,
        req.userData.id,
        req.body.shippingId,
        req.body.taxId,
      );

      RedisClient.del(`cart:${req.headers.cartid}`);
      RedisClient.del(`ordersFor:${req.userData.id}`);

      ResponseHelper.successWithData(result[0], res);
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }

  /**
   * @description Get a short list of order details
   * @param  {} req
   * @param  {} res
   */
  static async getShortDetails(req, res) {
    try {
      const redisKey = `order:${req.params.orderId}`;

      await RedisClient.getAsync(redisKey)
        .then(async data => {
          if (data) {
            const parsedData = JSON.parse(data);
            if (parsedData.customer_id !== req.userData.id) {
              throw new AppError('USR_17', 404, 'Order not found');
            }
            ResponseHelper.successWithData({ order: parsedData }, res);
          } else {
            const result = await OrderService.getShortDetails(req.params.orderId);
            if (!result || result.customer_id !== req.userData.id) {
              throw new AppError('USR_17', 404, 'Order not found');
            }
            RedisClient.set(redisKey, JSON.stringify(result));
            ResponseHelper.successWithData({ order: result }, res);
          }
        })
        .catch(error => {
          throw error;
        });
    } catch (error) {
      ResponseHelper.notFoundError(error, {}, res);
    }
  }

  /**
   * @description Get orders for a customer
   * @param  {} req
   * @param  {} res
   */
  static async getOrderByUser(req, res) {
    try {
      const redisKey = `ordersFor:${req.userData.id}`;

      await RedisClient.getAsync(redisKey)
        .then(async data => {
          if (data) {
            ResponseHelper.successWithData({ orders: JSON.parse(data) }, res);
          } else {
            const result = await OrderService.getOrders(req.userData.id);

            RedisClient.set(redisKey, JSON.stringify(result));
            ResponseHelper.successWithData({ orders: result }, res);
          }
        })
        .catch(error => {
          throw error;
        });
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }
}
