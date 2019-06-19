import ResponseHelper from '../helpers/ResponseHelper';
import RedisClient from '../helpers/RedisClient';
import TaxService from '../services/TaxService';
import AppError from '../helpers/AppError';

export default class TaxController {
  static async getTaxById(req, res) {
    try {
      const redisKey = `tax:${req.params.taxId}`;
      await RedisClient.getAsync(redisKey)
        .then(async data => {
          if (data) {
            ResponseHelper.successWithData({ tax: JSON.parse(data) }, res);
          } else {
            const result = await TaxService.getTaxById(req.params.taxId);
            if (result.length <= 0) {
              throw new AppError('USR_17', 404, 'Tax not found');
            }
            RedisClient.set(redisKey, JSON.stringify(result));
            ResponseHelper.successWithData({ tax: result }, res);
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
