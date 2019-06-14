import ProductMiddlewares from '../ProductMiddlewares';
import ResMock from '../../__mocks__/ResMock';

describe('ProductMiddlewares', () => {
  describe('.validateParams()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should reject invalid params', () => {
      const req = {
        query: {
          page: -1,
          limit: 'ten',
          descriptionLength: 'two',
        },
      };
      const next = jest.fn();

      ProductMiddlewares.validateParams(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          status: 400,
          code: 'USR_10',
          message: 'Some provided parameters are invalid.',
          fields: ['page', 'limit', 'descriptionLength'],
        },
      });
    });

    it('should reject invalid params', () => {
      const req = {
        query: {
          page: 10,
          limit: 20,
          descriptionLength: 20,
        },
      };
      const next = jest.fn();

      ProductMiddlewares.validateParams(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateProductId', () => {
    let res;
    let status;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
    });

    it('should respond with 400 error if id is incorrect', () => {
      const req = {
        params: {
          productId: 'one',
        },
      };
      const next = jest.fn();

      ProductMiddlewares.validateProductId(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
    });

    it('should call the next middleware if productId is a number', () => {
      const req = {
        params: {
          productId: 1,
        },
      };
      const next = jest.fn();

      ProductMiddlewares.validateProductId(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateQueryString', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should send an error response', () => {
      const req = {
        query: {
          queryString: ')(',
        },
      };
      const next = jest.fn();

      ProductMiddlewares.validateQueryString(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          status: 400,
          code: 'POD_03',
          message: 'The queryString provided is not valid',
          fields: ['queryString'],
        },
      });
    });

    it('should send error if no query string is provided', () => {
      const req = {
        query: {},
      };
      const next = jest.fn();

      ProductMiddlewares.validateQueryString(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          status: 400,
          code: 'POD_04',
          message: 'Please provide a queryString',
          fields: ['queryString'],
        },
      });
    });

    it('should call the next middleware', () => {
      const req = {
        query: {
          queryString: 'string',
        },
      };
      const next = jest.fn();

      ProductMiddlewares.validateQueryString(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
