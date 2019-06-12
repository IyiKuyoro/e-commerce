import ResMock from '../../__mocks__/ResMock';
import CategoryService from '../../services/CategoryService';
import CategoryMiddlewares from '../CategoryMiddlewares';

describe('CategoryMiddlewares', () => {
  describe('.checkCategoryExists', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should respond with error if the category is not found', async () => {
      const req = {
        params: {
          categoryId: 1,
        },
      };
      const next = jest.fn();

      jest.spyOn(CategoryService, 'getCategoryDetails').mockImplementation(async () => []);

      await CategoryMiddlewares.checkCategoryExists(req, res, next);

      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'CAT_01',
          status: 404,
          message: 'Category not found',
          fields: ['categoryId'],
        },
      });
    });

    it('should call next middleware id category is found', async () => {
      const req = {
        params: {
          departmentId: 1,
        },
      };
      const next = jest.fn();

      jest.spyOn(CategoryService, 'getCategoryDetails').mockImplementation(async () => ({
        category_id: 1,
        name: 'Gold',
      }));

      await CategoryMiddlewares.checkCategoryExists(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('ValidateCategoryId', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should respond with error if the category id is missing', () => {
      const req = {
        params: {},
      };
      const next = jest.fn();

      CategoryMiddlewares.validateCategoryId(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          status: 400,
          code: 'CAT_02',
          message: 'Some parameters are missing',
          fields: ['categoryId'],
        },
      });
    });

    it('should respond with error if the category id is not a number', () => {
      const req = {
        params: {
          categoryId: 'ten',
        },
      };
      const next = jest.fn();

      CategoryMiddlewares.validateCategoryId(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          status: 400,
          code: 'CAT_03',
          message: 'Some parameters are invalid',
          fields: ['categoryId'],
        },
      });
    });

    it('should call the next middleware', () => {
      const req = {
        params: {
          categoryId: 10,
        },
      };
      const next = jest.fn();

      CategoryMiddlewares.validateCategoryId(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
