import ResponseHelper from '../helpers/ResponseHelper';
import AppError from '../helpers/AppError';

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
}
