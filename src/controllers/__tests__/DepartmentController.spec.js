import ResMock from '../../__mocks__/ResMock';
import DepartmentService from '../../services/DepartmentService';
import DepartmentServiceMock from '../../services/__mocks__/DepartmentService.mock';
import DepartmentsController from '../DepartmentsController';

describe('DepartmentsController', () => {
  describe('.getDepartmentsList', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should get the list of the departments in the database', async () => {
      const req = {};

      jest.spyOn(DepartmentService, 'getDepartmentList').mockImplementation(DepartmentServiceMock.getDepartmentList);

      await DepartmentsController.getDepartmentList(req, res);

      expect(status).toHaveBeenCalledWith(200);
    });

    it('should respond with an error if one occurs', async () => {
      const req = {};

      jest.spyOn(DepartmentService, 'getDepartmentList').mockImplementation(async () => {
        throw new Error('Server error');
      });

      await DepartmentsController.getDepartmentList(req, res);

      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'Server error has occurred!',
          status: 500,
        },
      });
    });

    it('should respond with an 204 if no departments are found', async () => {
      const req = {};

      jest.spyOn(DepartmentService, 'getDepartmentList').mockImplementation(async () => []);

      await DepartmentsController.getDepartmentList(req, res);

      expect(status).toHaveBeenCalledWith(204);
      expect(json).toHaveBeenCalledWith({
        success: true,
        rows: [],
      });
    });
  });
});
