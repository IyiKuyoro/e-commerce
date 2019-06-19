import ResponseHelper from '../helpers/ResponseHelper';
import { checkProps, validateNumbers } from '../helpers/helperFunctions';
import AppError from '../helpers/AppError';

export default class OrderMiddleware {
  static async checkParams(req, res, next) {
    try {
      const errors = checkProps(req.body, 'shippingId', 'taxId');

      if (errors.length > 0) {
        throw new AppError('USR_14', 400, 'Some required parameters are missing', errors);
      }

      const typeError = validateNumbers(req.body, 'shippingId', 'taxId');

      if (typeError.length > 0) {
        throw new AppError('USR_15', 400, 'Parameters must be positive integers', typeError);
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }

  /**
   * @description get order details
   * @param  {} req
   * @param  {} res
   * @param  {} next
   */
  static validateOrderId(req, res, next) {
    try {
      const errors = validateNumbers(req.params, 'orderId');

      if (errors.length > 0) {
        throw new AppError('USR_15', 400, 'Parameter must be positive integers', errors);
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }
}
