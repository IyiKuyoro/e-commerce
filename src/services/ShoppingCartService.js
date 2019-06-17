import RedisClient from '../helpers/RedisClient';
import sequelize from '../database/models/sequelize';

export default class ShoppingCartService {
  /**
   * @description Add product to shopping cart
   */
  static async addProductToCart(cartId, productId, attributes = 'regular') {
    await sequelize.query(`CALL shopping_cart_add_product("${cartId}", "${productId}", "${attributes}");`, {
      raw: true,
    });

    const result = await this.getProductsInCart(cartId);

    await RedisClient.set(`cart:${cartId}`, JSON.stringify(result));

    return result;
  }

  /**
   * @description Get products from cache or db
   * @param  {} cartId
   */
  static async getProductsInCartWithCache(cartId) {
    const redisKey = `cart:${cartId}`;
    let result;

    await RedisClient.getAsync(redisKey)
      .then(async data => {
        if (data) {
          result = JSON.parse(data);
          return;
        }
        result = await sequelize.query(`CALL shopping_cart_get_products("${cartId}");`, { raw: true });
        RedisClient.set(redisKey, JSON.stringify(result));
      })
      .catch(error => {
        throw error;
      });

    return result;
  }

  /**
   * @description Get products in cart form db
   * @param  {} cartId
   */
  static async getProductsInCart(cartId) {
    const result = await sequelize.query(`CALL shopping_cart_get_products("${cartId}");`, { raw: true });

    return result;
  }

  /**
   * @description Remove item from cart
   * @param  {} cartId
   * @param  {} itemId
   */
  static async removeItem(cartId, itemId) {
    await sequelize.query(`CALL shopping_cart_remove_product("${itemId}", "${cartId}");`, { raw: true });

    const result = await this.getProductsInCart(cartId);
    await RedisClient.set(`cart:${cartId}`, JSON.stringify(result));

    return result;
  }
}
