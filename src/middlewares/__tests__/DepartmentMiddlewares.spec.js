import ResMock from '../../__mocks__/ResMock';
import DepartmentMiddlewares from '../DepartmentMiddlewares';
import DepartmentService from '../../services/DepartmentService';

describe('DepartmentMiddlewares', () => {
  describe('.checkDepartmentExists', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should respond with error if the department is not found', async () => {
      const req = {
        params: {
          departmentId: 1,
        },
      };
      const next = jest.fn();

      jest.spyOn(DepartmentService, 'getDepartmentDetails').mockImplementation(async () => []);

      await DepartmentMiddlewares.checkDepartmentExists(req, res, next);

      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'DEP_02',
          status: 404,
          message: 'Department not found',
          fields: ['departmentId'],
        },
      });
    });

    it('should call next middleware id department is found', async () => {
      const req = {
        params: {
          departmentId: 1,
        },
      };
      const next = jest.fn();

      jest.spyOn(DepartmentService, 'getDepartmentDetails').mockImplementation(async () => ({
        department_id: 1,
        name: 'Gold',
      }));

      await DepartmentMiddlewares.checkDepartmentExists(req, res, next);

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

      DepartmentMiddlewares.validateDepartmentId(req, res, next);

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

      DepartmentMiddlewares.validateDepartmentId(req, res, next);

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

      DepartmentMiddlewares.validateDepartmentId(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
