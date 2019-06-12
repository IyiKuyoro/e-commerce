import ResponseHelper from '../helpers/ResponseHelper';
import TypeValidations from '../helpers/TypeValidations';
import AppError from '../helpers/AppError';
import CategoryService from '../services/CategoryService';

export default class CategoryMiddlewares {
  /**
   * @description check that the category id passed is correct
   * @param  {object} req The http request object
   * @param  {object} res The http response object
   * @param  {function} next The next middleware
   */
  static validateCategoryId(req, res, next) {
    try {
      if (!req.params.categoryId) {
        throw new AppError('CAT_02', 400, 'Some parameters are missing', ['categoryId']);
      }

      const errors = TypeValidations.validateParamsAsNumbers(req.params, 'categoryId');

      if (errors.length > 0) {
        throw new AppError('CAT_03', 400, 'Some parameters are invalid', errors);
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }

  /**
   * @description Checks that the category exists
   * @param  {object} req The http request object
   * @param  {object} res The http response object
   * @param  {function} next The next middleware
   */
  static async checkCategoryExists(req, res, next) {
    try {
      const result = await CategoryService.getCategoryDetails(req.params.categoryId);

      if (result.length <= 0) {
        throw new AppError('CAT_01', 404, 'Category not found', ['categoryId']);
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }
}
