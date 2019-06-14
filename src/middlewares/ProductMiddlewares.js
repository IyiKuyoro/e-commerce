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

  /**
   * @description Validate the productId
   * @param  {} req
   * @param  {} res
   * @param  {} next
   */
  static validateProductId(req, res, next) {
    try {
      const errors = TypeValidations.validateParamsAsNumbers(req.params, 'productId');

      if (errors.length > 0) {
        throw new AppError('POD_02', 400, 'The id provided is not a number', ['productId']);
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }

  /**
   * @description Validate the query string for a search request
   * @param  {} req
   * @param  {} res
   * @param  {} next
   */
  static validateQueryString(req, res, next) {
    try {
      if (!req.query.queryString) {
        throw new AppError('POD_04', 400, 'Please provide a queryString', ['queryString']);
      }

      if (/^[+=!@#$%^&*()/]+$/.test(req.query.queryString)) {
        throw new AppError('POD_03', 400, 'The queryString provided is not valid', ['queryString']);
      }

      if (req.query.allWords && ['on', 'off'].indexOf(req.query.allWords.toLowerCase().trim()) < 0) {
        throw new AppError('POD_05', 400, 'allWords can only be on or off', ['allWords']);
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }
}
