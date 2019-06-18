import ResponseHelper from '../helpers/ResponseHelper';
import AppError from '../helpers/AppError';

export default class ShippingMiddlewares {
  static validateRegionId(req, res, next) {
    try {
      if (!req.params.regionId) {
        throw new AppError('USR_15', 400, 'Please provide the region id');
      }

      if (!/^0*?[1-9]+[0-9]*$/.test(req.params.regionId)) {
        throw new AppError('USR_14', 400, 'Id must be a positive integer', ['regionId']);
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }
}
