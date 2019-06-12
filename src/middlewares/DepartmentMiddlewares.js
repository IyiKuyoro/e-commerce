import ResponseHelper from '../helpers/ResponseHelper';
import DepartmentService from '../services/DepartmentService';
import AppError from '../helpers/AppError';
import TypeValidations from '../helpers/TypeValidations';

export default class DepartmentMiddlewares {
  /**
   * @description Checks that the department exists
   * @param  {object} req The http request object
   * @param  {object} res The http response object
   * @param  {function} next The next middleware
   */
  static async checkDepartmentExists(req, res, next) {
    try {
      const result = await DepartmentService.getDepartmentDetails(req.params.departmentId);

      if (result.length <= 0) {
        throw new AppError('DEP_02', 404, 'Department not found', ['departmentId']);
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }

  /**
   * @description Checks that the department Id was passed and is the correct type
   * @param  {object} req The http request object
   * @param  {object} res The http response object
   * @param  {function} next The next middleware
   */
  static validateDepartmentId(req, res, next) {
    try {
      if (!req.params.departmentId) {
        throw new AppError('DEP_03', 400, 'Some parameters are missing', ['departmentId']);
      }

      const errors = TypeValidations.validateParamsAsNumbers(req.params, 'departmentId');

      if (errors.length > 0) {
        throw new AppError('DEP_01', 400, 'Some parameters are invalid', errors);
      }

      next(0);
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }
}
