import ResponseHelper from '../helpers/ResponseHelper';
import ProductServices from '../services/ProductServices';
import RedisClient from '../helpers/RedisClient';
import AppError from '../helpers/AppError';

export default class ProductsController {
  /**
   * @description Get products from catalog {paginated}
   * @param  {Object} req The http request object
   * @param  {Object} res The http response object
   */
  static async getProducts(req, res) {
    try {
      const { page, limit, descriptionLength } = req.query;
      const redisKey = `product:${req.originalUrl}`;

      await RedisClient.getAsync(redisKey)
        .then(async result => {
          if (result) {
            const cachedRes = JSON.parse(result);
            res.status(200).json(cachedRes);
          } else {
            const results = await ProductServices.getProducts(page, limit, descriptionLength);
            const counts = await ProductServices.getProductsCounts();
            const pageMeta = {
              page: page || 1,
              totalPages: Math.ceil(counts / (limit || 20)),
              pageSize: results.length,
              totalProducts: counts,
            };

            const newRes = {
              success: true,
              count: results.length,
              pageMeta,
              rows: results,
            };

            RedisClient.set(redisKey, JSON.stringify(newRes));
            res.status(200).json(newRes);
          }
        })
        .catch(error => {
          throw error;
        });
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }

  /**
   * @description Get the products by department
   * @param  {Object} req The http request object
   * @param  {Object} res The http response object
   */
  static async getProductsByDepartment(req, res) {
    try {
      const { page, limit, descriptionLength } = req.query;
      const { departmentId } = req.params;
      const redisKey = `product:${req.originalUrl}`;

      await RedisClient.getAsync(redisKey)
        .then(async data => {
          if (data) {
            const cachedRes = JSON.parse(data);
            ResponseHelper.successWithData(cachedRes, res);
          } else {
            const results = await ProductServices.getProductsByDepartment(departmentId, page, limit, descriptionLength);
            const counts = await ProductServices.countProductsByDepartment(departmentId);

            const pageMeta = {
              page: page || 1,
              totalPages: Math.ceil(counts / (limit || 20)),
              pageSize: results.length,
              totalProducts: counts,
            };

            if (results.length <= 0) {
              res.status(204).json({
                success: true,
                pageMeta,
                rows: [],
              });
              return;
            }

            const newRes = {
              count: results.length,
              pageMeta,
              rows: results,
            };

            RedisClient.set(redisKey, JSON.stringify(newRes));
            ResponseHelper.successWithData(newRes, res);
          }
        })
        .catch(error => {
          throw error;
        });
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }

  /**
   * @description Get the products by categories
   * @param  {Object} req The http request object
   * @param  {Object} res The http response object
   */
  static async getProductsByCategory(req, res) {
    try {
      const { page, limit, descriptionLength } = req.query;
      const { categoryId } = req.params;
      const redisKey = `product:${req.originalUrl}`;

      await RedisClient.getAsync(redisKey)
        .then(async data => {
          if (data) {
            const cachedRes = JSON.parse(data);
            ResponseHelper.successWithData(cachedRes, res);
          } else {
            const results = await ProductServices.getProductsByCategory(categoryId, page, limit, descriptionLength);
            const counts = await ProductServices.countProductsByCategory(categoryId);

            const pageMeta = {
              page: page || 1,
              totalPages: Math.ceil(counts / (limit || 20)),
              pageSize: results.length,
              totalProducts: counts,
            };

            if (results.length <= 0) {
              res.status(204).json({
                success: true,
                pageMeta,
                rows: [],
              });
              return;
            }

            const newRes = {
              count: results.length,
              pageMeta,
              rows: results,
            };

            RedisClient.set(redisKey, JSON.stringify(newRes));
            ResponseHelper.successWithData(newRes, res);
          }
        })
        .catch(error => {
          throw error;
        });
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }

  /**
   * @description Get product details
   * @param  {Object} req The http request object
   * @param  {Object} res The http response object
   */
  static async getProductDetails(req, res) {
    try {
      const { productId } = req.params;
      const redisKey = `product:${productId}`;

      await RedisClient.getAsync(redisKey)
        .then(async data => {
          if (data) {
            const cachedRes = JSON.parse(data);
            ResponseHelper.successWithData(cachedRes, res);
          } else {
            const product = await ProductServices.getProductDetails(productId);

            if (!product) {
              throw new AppError('POD_01', 404, 'Product not found');
            }

            RedisClient.set(redisKey, JSON.stringify(product));
            ResponseHelper.successWithData(product, res);
          }
        })
        .catch(error => {
          throw error;
        });
    } catch (error) {
      ResponseHelper.notFoundError(error, {}, res);
    }
  }
}
