import jwt from 'jsonwebtoken';

import config from '../configs';
import ResponseHelper from '../helpers/ResponseHelper';
import AppError from '../helpers/AppError';
import { checkProps, validateStrings } from '../helpers/helperFunctions';
import CustomerService from '../services/CustomerService';

class Helpers {
  /**
   * @description Check that email is valid
   * @param  {string} email
   */
  static validateEmail(email) {
    const emailRegex = /^[-._a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-z]+$/;

    if (!emailRegex.test(email)) {
      return false;
    }

    return true;
  }

  /**
   * @description Check that name is valid
   * @param  {string} name
   */
  static validateName(name) {
    const nameRegex = /^[^+=!@#$%^&*()/0-9]+$/;

    if (!nameRegex.test(name)) {
      return false;
    }

    return true;
  }
}

export default class CustomerMiddlewares {
  /**
   * @description Check the type of parameters passed
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param  {Function} next The next middleware
   */
  static validateParams(req, res, next) {
    try {
      const { name, email } = req.body;
      const errors = [];

      if (!Helpers.validateName(name)) {
        errors.push('name');
      }

      if (!Helpers.validateEmail(email)) {
        errors.push('email');
      }

      if (errors.length > 0) {
        throw new AppError('USR_10', 400, 'Some parameters passed are not valid', errors);
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }

  /**
   * @description Checks that the required parameters are passed
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param  {Function} next The next middleware
   */
  static checkRequiredRegParams(req, res, next) {
    try {
      const errors = checkProps(req.body, 'name', 'email', 'password');

      if (errors.length > 0) {
        throw new AppError('USR_10', 400, 'Some required params are missing from the request body', errors);
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }

  /**
   * @description Check that email is available
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param  {Function} next The next middleware
   */
  static async checkAvailableEmail(req, res, next) {
    try {
      const user = await CustomerService.getLoginInfo(req.body.email);

      if (user) {
        throw new AppError('USR_4', 409, 'This email is already in use', ['email']);
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }

  /**
   * @description Checks that the required parameters are passed on signin
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param  {Function} next The next middleware
   */
  static async checkRequiredLoginParams(req, res, next) {
    try {
      const errors = checkProps(req.body, 'email', 'password');

      if (errors.length > 0) {
        throw new AppError('USR_10', 400, 'Some required parameters are missing from the request body', errors);
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }

  /**
   * @description Checks that the required parameters are of the right type
   * @param  {object} req The HTTP request object
   * @param  {object} res The HTTP response object
   * @param  {Function} next The next middleware
   */
  static async validLoginParams(req, res, next) {
    try {
      const { email } = req.body;
      const errors = [];

      if (!Helpers.validateEmail(email)) {
        errors.push('email');
      }

      if (errors.length > 0) {
        throw new AppError('USR_10', 400, 'Some parameters are not valid', errors);
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }

  /**
   * @description Validate required address params
   * @param  {} req
   * @param  {} res
   * @param  {} next
   */
  static validateRequiredAddressParams(req, res, next) {
    try {
      const missingErrors = checkProps(
        req.body,
        'address1',
        'city',
        'region',
        'postalCode',
        'country',
        'shippingRegionId',
      );
      const typeErrors = validateStrings(
        req.body,
        'address1',
        'address2',
        'city',
        'region',
        'postalCode',
        'country',
        'shippingRegionId',
      );

      if (missingErrors.length > 0) {
        throw new AppError('USR_14', 400, 'Some required parameters are missing', missingErrors);
      }

      if (typeErrors.length > 0) {
        throw new AppError('USR_15', 400, 'Parameters must not match special characters +=!@#$%^&*()', typeErrors);
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }

  /**
   * @description Ensure that customer id is correct
   * @param  {} req
   * @param  {} res
   * @param  {} next
   */
  static validateCustomerToken(req, res, next) {
    try {
      if (req.headers.authorization.indexOf('Bearer ') < 0) {
        throw new Error();
      }

      const token = req.headers.authorization.replace('Bearer ', '');
      req.userData = jwt.verify(token, config.SECRETE);

      next();
    } catch (error) {
      error.statusCode = 401;
      error.code = 'USR_16';
      error.message = 'Authorization failed.';
      ResponseHelper.parametersError(error, res);
    }
  }
}
