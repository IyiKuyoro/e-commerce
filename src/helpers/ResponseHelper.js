import Logger from './Logger';

export default class ResponseHelper {
  /**
   * @description Send an error response
   * @param  {Object} error The error object
   * @param  {Object} res The HTTP express response object
   */
  static parametersError(error, res) {
    if (!error.statusCode) {
      ResponseHelper.serverError(error, res);
    } else {
      res.status(error.statusCode).json({
        success: false,
        error: {
          status: error.statusCode,
          code: error.code,
          message: error.message,
          fields: error.fields,
        },
      });
    }
  }

  /**
   * @description Send an error response
   * @param  {Object} error The error object
   * @param  {Object} res The HTTP express response object
   */
  static serverError(error, res) {
    res.status(500).json({
      success: false,
      error: {
        status: 500,
        message: 'Server error has occurred!',
      },
    });
    Logger.error(error);
  }
}
