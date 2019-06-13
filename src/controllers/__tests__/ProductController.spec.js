import ResMock from '../../__mocks__/ResMock';
import ProductController from '../ProductsController';
import ProductServices from '../../services/ProductServices';
import ProductServicesMock from '../../services/__mocks__/ProductService.mocks';
import RedisClient from '../../helpers/RedisClient';

describe('ProductController', () => {
  describe('.getProducts()', () => {
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

    it('should get the products in the app', async () => {
      const req = {
        query: {},
        originalUrl: 'test',
      };
      jest.spyOn(ProductServices, 'getProducts').mockImplementation(ProductServicesMock.getProducts);
      jest.spyOn(ProductServices, 'getProductsCounts').mockImplementation(ProductServicesMock.getProductsCounts);

      await ProductController.getProducts(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({
        success: true,
        count: 1,
        pageMeta: {
          page: 1,
          totalPages: 1,
          pageSize: 1,
          totalProducts: 1,
        },
        rows: [
          {
            product_id: 1,
            name: 'Product 1',
            description: 'This is a product',
            price: 14.99,
            discounted_price: 0.0,
            image: null,
            image_2: null,
            thumbnail: 'arc-d-triomphe-thumbnail.gif',
            display: '2',
          },
        ],
      });
    });

    it('should get the products in the app', async () => {
      const req = {
        query: {
          page: 2,
          limit: 10,
          descriptionLength: 200,
        },
      };
      jest.spyOn(ProductServices, 'getProducts').mockImplementation(() => []);
      jest.spyOn(ProductServices, 'getProductsCounts').mockImplementation(ProductServicesMock.getProductsCounts);

      await ProductController.getProducts(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({
        success: true,
        count: 0,
        pageMeta: {
          page: 2,
          totalPages: 1,
          pageSize: 0,
          totalProducts: 1,
        },
        rows: [],
      });
    });

    it('should return error', async () => {
      const req = {};
      jest.spyOn(ProductServices, 'getProducts').mockImplementation(() => []);
      jest.spyOn(ProductServices, 'getProductsCounts').mockImplementation(ProductServicesMock.getProductsCounts);

      await ProductController.getProducts(req, res);

      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'Server error has occurred!',
          status: 500,
        },
      });
    });
  });

  describe('.getProductsByDepartment', () => {
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

    it('should get the products in the requested department', async () => {
      const req = {
        params: {
          departmentId: 1,
        },
        query: {
          page: 1,
          limit: 10,
          descriptionLength: 200,
        },
      };

      jest.spyOn(ProductServices, 'getProductsByDepartment').mockImplementation(ProductServicesMock.getProducts);
      jest
        .spyOn(ProductServices, 'countProductsByDepartment')
        .mockImplementation(ProductServicesMock.getProductsCounts);

      await ProductController.getProductsByDepartment(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({
        success: true,
        count: 1,
        pageMeta: {
          page: 1,
          totalPages: 1,
          pageSize: 1,
          totalProducts: 1,
        },
        rows: [
          {
            product_id: 1,
            name: 'Product 1',
            description: 'This is a product',
            price: 14.99,
            discounted_price: 0.0,
            image: null,
            image_2: null,
            thumbnail: 'arc-d-triomphe-thumbnail.gif',
            display: '2',
          },
        ],
      });
    });

    it('should respond with a server error if one occurs', async () => {
      const req = {
        params: {
          departmentId: 1,
        },
        query: {
          page: 2,
          limit: 10,
          descriptionLength: 200,
        },
      };

      jest.spyOn(ProductServices, 'getProductsByDepartment').mockImplementation(async () => {
        throw new Error('Server error');
      });

      await ProductController.getProductsByDepartment(req, res);

      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'Server error has occurred!',
          status: 500,
        },
      });
    });
  });

  describe('.getProductsByCategory', () => {
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

    it('should get the products in the requested category', async () => {
      const req = {
        params: {
          categoryId: 1,
        },
        query: {
          page: 1,
          limit: 10,
          descriptionLength: 200,
        },
      };

      jest.spyOn(ProductServices, 'getProductsByCategory').mockImplementation(ProductServicesMock.getProducts);
      jest.spyOn(ProductServices, 'countProductsByCategory').mockImplementation(ProductServicesMock.getProductsCounts);

      await ProductController.getProductsByCategory(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({
        success: true,
        count: 1,
        pageMeta: {
          page: 1,
          totalPages: 1,
          pageSize: 1,
          totalProducts: 1,
        },
        rows: [
          {
            product_id: 1,
            name: 'Product 1',
            description: 'This is a product',
            price: 14.99,
            discounted_price: 0.0,
            image: null,
            image_2: null,
            thumbnail: 'arc-d-triomphe-thumbnail.gif',
            display: '2',
          },
        ],
      });
    });

    it('should respond with a server error if one occurs', async () => {
      const req = {
        params: {
          departmentId: 1,
        },
        query: {
          page: 2,
          limit: 10,
          descriptionLength: 200,
        },
      };

      jest.spyOn(ProductServices, 'getProductsByCategory').mockImplementation(async () => {
        throw new Error('Server error');
      });

      await ProductController.getProductsByCategory(req, res);

      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'Server error has occurred!',
          status: 500,
        },
      });
    });
  });
});
