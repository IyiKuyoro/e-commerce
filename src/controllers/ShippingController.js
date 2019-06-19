import ResponseHelper from '../helpers/ResponseHelper';
import ShippingService from '../services/ShippingService';
import RedisClient from '../helpers/RedisClient';

export default class ShippingController {
  static async getRegions(req, res) {
    try {
      const redisKey = 'shippingRegions:all';

      await RedisClient.getAsync(redisKey)
        .then(async data => {
          if (data) {
            ResponseHelper.successWithData({ shippingRegions: JSON.parse(data) }, res);
          } else {
            const regions = await ShippingService.getRegions();
            RedisClient.set(redisKey, JSON.stringify(regions));
            ResponseHelper.successWithData({ shippingRegions: regions }, res);
          }
        })
        .catch(error => {
          throw error;
        });
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }

  static async getShippingInfo(req, res) {
    try {
      const redisKey = `shippingInfo:${req.params.regionId}`;

      await RedisClient.getAsync(redisKey)
        .then(async data => {
          if (data) {
            ResponseHelper.successWithData({ shipping: JSON.parse(data) }, res);
          } else {
            const shipping = await ShippingService.getShippingDetails(req.params.regionId);
            RedisClient.set(redisKey, JSON.stringify(shipping));
            ResponseHelper.successWithData({ shipping }, res);
          }
        })
        .catch(error => {
          throw error;
        });
    } catch (error) {
      ResponseHelper.notFoundError(error, {}, res);
    }
  }
}
