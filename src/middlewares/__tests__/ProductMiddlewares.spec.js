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

  describe('validateDepartmentId', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should respond with error if the department id is missing', () => {
      const req = {
        params: {},
      };
      const next = jest.fn();

      ProductMiddlewares.validateDepartmentId(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          status: 400,
          code: 'DEP_03',
          message: 'Some parameters are missing',
          fields: ['departmentId'],
        },
      });
    });

    it('should respond with error if the department id is not a number', () => {
      const req = {
        params: {
          departmentId: 'ten',
        },
      };
      const next = jest.fn();

      ProductMiddlewares.validateDepartmentId(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          status: 400,
          code: 'DEP_01',
          message: 'Some parameters are invalid',
          fields: ['departmentId'],
        },
      });
    });

    it('should call the next middleware', () => {
      const req = {
        params: {
          departmentId: 10,
        },
      };
      const next = jest.fn();

      ProductMiddlewares.validateDepartmentId(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
