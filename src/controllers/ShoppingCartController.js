import uuid from 'short-uuid';
import ResponseHelper from '../helpers/ResponseHelper';
import ShoppingCartService from '../services/ShoppingCartService';

export default class ShoppingCartController {
  /**
   * @description Get total amount of items in cart
   * @param  {} req
   * @param  {} res
   */
  static async getTotalAmount(req, res) {
    try {
      const { headers } = req;
      const amount = await ShoppingCartService.getTotalAmount(headers.cartid);

      res.status(200).json({
        success: true,
        totalAmount: amount,
      });
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }

  /**
   * @description Add product to cart operations
   * @param  {} req
   * @param  {} res
   */
  static async addProductToCart(req, res) {
    try {
      const { headers, body } = req;

      const result = await ShoppingCartService.addProductToCart(headers.cartid, body.productId);

      res.status(200).json({
        success: true,
        products: result,
      });
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }

  /**
   * @description Get products in cart
   * @param  {} req
   * @param  {} res
   */
  static async getCartProducts(req, res) {
    try {
      const { headers } = req;

      const result = await ShoppingCartService.getProductsInCartWithCache(headers.cartid);

      res.status(200).json({
        success: true,
        products: result,
      });
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }

  /**
   * @description generate cartid
   * @param  {} req
   * @param  {} res
   */
  static async generateCartId(req, res) {
    let cartId = uuid.generate();
    let products = await ShoppingCartService.getProductsInCart(cartId);

    while (products.length > 0) {
      cartId = uuid.generate();
      products = ShoppingCartService.getProductsInCart(cartId);
    }

    ShoppingCartService.getProductsInCart(await Promise.all(products));

    res.status(200).json({
      success: true,
      cartId,
    });
  }

  /**
   * @description Remove product from cart
   * @param  {} req
   * @param  {} res
   */
  static async removeProduct(req, res) {
    try {
      const { headers, params } = req;

      const result = await ShoppingCartService.removeItem(headers.cartid, params.itemId);

      res.status(200).json({
        success: true,
        products: result,
      });
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }

  /**
   * @description update item in cart
   * @param  {} req
   * @param  {} res
   */
  static async updateItem(req, res) {
    try {
      const { headers, params, body } = req;

      const result = await ShoppingCartService.updateItem(headers.cartid, params.itemId, body.quantity);

      res.status(200).json({
        success: true,
        products: result,
      });
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }
}
