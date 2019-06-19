import ResponseHelper from '../helpers/ResponseHelper';

export default class StipeMiddleware {
  static validateAmount(req, res, next) {
    try {
      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }
}
