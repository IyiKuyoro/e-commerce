import Logger from './logger';

export default class ResponseHelper {
  /**
   * @description Send a newly created resource response
   * @param  {object} payload The response body
   * @param  {string} location The new location of the resource
   * @param  {object} res The HTTP response object
   */
  static successWithDataCreated(payload, location, res) {
    res.set({
      url: location,
    });
    res.status(201).json({
      success: true,
      ...payload,
    });
  }

  /**
   * @description Send a newly created resource response
   * @param  {object} payload The response body
   * @param  {object} res The HTTP response object
   */
  static successWithData(payload, res) {
    res.status(200).json({
      success: true,
      ...payload,
    });
  }

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

  /**
   * @description Send 404 error message
   * @param  {} error
   * @param  {} payload
   * @param  {} res
   */
  static notFoundError(error, payload, res) {
    if (!error.statusCode) {
      ResponseHelper.serverError(error, res);
    } else {
      res.status(404).json({
        success: false,
        error: {
          code: error.code,
          status: 404,
          message: error.message,
          ...payload,
        },
      });
    }
  }

  static paymentError(error, res) {
    if (/^4[0-9]+$/.test(error.statusCode)) {
      res.status(error.statusCode).json({
        success: false,
        error: {
          status: error.statusCode,
          message: error.message,
        },
      });
    } else {
      this.serverError(error, res);
    }
  }
}
