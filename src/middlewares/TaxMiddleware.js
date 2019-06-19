import ResponseHelper from '../helpers/ResponseHelper';
import AppError from '../helpers/AppError';
import RedisClient from '../helpers/RedisClient';
import TaxService from '../services/TaxService';

export default class TaxMiddleware {
  static validateTaxId(req, res, next) {
    try {
      if (!req.params.taxId) {
        throw new AppError('USR_15', 400, 'Please provide the taxId');
      }

      if (!/^0*?[1-9]+[0-9]*$/.test(req.params.taxId)) {
        throw new AppError('USR_14', 400, 'Id must be a positive integer', ['taxId']);
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }

  static async checkTaxExists(req, res, next) {
    try {
      const redisKey = `tax:${req.body.taxId}`;
      await RedisClient.getAsync(redisKey)
        .then(async data => {
          if (data) {
            next();
          } else {
            const result = await TaxService.getTaxById(req.body.taxId);
            if (result.length <= 0) {
              throw new AppError('USR_17', 404, 'Tax not found');
            }
            RedisClient.set(redisKey, JSON.stringify(result));
            next();
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
