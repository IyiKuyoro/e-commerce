import AppError from '../helpers/AppError';
import ResponseHelper from '../helpers/ResponseHelper';
import TypeValidations from '../helpers/TypeValidations';

export default class ProductMiddlewares {
  static validateParams(req, res, next) {
    try {
      const errors = TypeValidations.validateParamsAsNumbers(req.query, 'page', 'limit', 'descriptionLength');

      if (errors.length > 0) {
        throw new AppError('USR_10', 400, 'Some provided parameters are invalid.', errors);
      }
      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }
}
