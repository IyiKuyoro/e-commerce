import ResponseHelper from '../helpers/ResponseHelper';
import TypeValidations from '../helpers/TypeValidations';
import AppError from '../helpers/AppError';
import RedisClient from '../helpers/RedisClient';
import ProductServices from '../services/ProductServices';

export default class ShoppingCartMiddleware {
  /**
   * @description Validate the product id
   * @param  {} req
   * @param  {} res
   * @param  {} next
   */
  static async validateProductId(req, res, next) {
    try {
      ShoppingCartMiddleware.checkId(req);
      ShoppingCartMiddleware.checkIdType(req);

      const redisKey = `product:${req.body.productId}`;

      await RedisClient.getAsync(redisKey)
        .then(async data => {
          if (data) {
            req.productDetails = JSON.parse(data);
          } else {
            const productDetails = await ProductServices.getProductDetails(req.body.productId);
            if (!productDetails) {
              throw new AppError('POD_02', 404, 'Product not found');
            }
            RedisClient.set(redisKey, JSON.stringify(productDetails));
          }
          next();
        })
        .catch(error => {
          throw error;
        });
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }

  static validateShoppingCartId(req, res, next) {
    try {
      const { cookies } = req;

      if (!cookies.cartId) {
        throw new AppError('USR_11', 400, 'No shopping cartId provided');
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }

  static validateItemId(req, res, next) {
    try {
      const { params } = req;

      if (!params.itemId) {
        throw new AppError('USR_13', 400, 'Item id not provided', ['itemId']);
      }

      if (TypeValidations.validateParamsAsNumbers(params, 'itemId').length > 0) {
        throw new AppError('USR_12', 400, 'Item ID is not provided');
      }

      next();
    } catch (error) {
      ResponseHelper.parametersError(error, res);
    }
  }

  static checkId(req) {
    if (!req.body.productId) {
      throw new AppError('POD_01', 400, 'Please provide a productId');
    }
  }

  static checkIdType(req) {
    const errors = TypeValidations.validateParamsAsNumbers(req.body, 'productId');
    if (errors.length > 0) {
      throw new AppError('POD_02', 400, 'ProductId is not a number', errors);
    }
  }
}
