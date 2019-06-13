import ResMock from '../../__mocks__/ResMock';
import CategoryController from '../CategoryController';
import CategoriesService from '../../services/CategoryService';
import CategoriesServiceMock from '../../services/__mocks__/CategoryService.mock';
import RedisClient from '../../helpers/RedisClient';

describe('CategoryController', () => {
  describe('.getCategoriesList', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
      jest.spyOn(RedisClient, 'get').mockImplementation((err, r) => {
        r(null);
      });
    });

    it('should get the list of the departments in the database', async () => {
      const req = {
        params: {
          departmentId: 1,
        },
      };

      jest.spyOn(CategoriesService, 'getCategories').mockImplementation(CategoriesServiceMock.getCategories);

      await CategoryController.getCategoriesList(req, res);

      expect(status).toHaveBeenCalledWith(200);
    });

    it('should respond with an error if one occurs', async () => {
      const req = {};

      jest.spyOn(CategoriesService, 'getCategories').mockImplementation(async () => {
        throw new Error('Server error');
      });

      await CategoryController.getCategoriesList(req, res);

      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'Server error has occurred!',
          status: 500,
        },
      });
    });

    it('should respond with an 204 if no categories are found', async () => {
      const req = {
        params: {
          departmentId: 1,
        },
      };

      jest.spyOn(CategoriesService, 'getCategories').mockImplementation(async () => []);

      await CategoryController.getCategoriesList(req, res);

      expect(status).toHaveBeenCalledWith(204);
      expect(json).toHaveBeenCalledWith({
        success: true,
        rows: [],
      });
    });
  });
});
