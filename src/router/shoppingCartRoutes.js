import { Router } from 'express';
import ShoppingCartMiddleware from '../middlewares/ShoppingCartMiddleware';
import ShoppingCartController from '../controllers/ShoppingCartController';

const cartRouter = Router();

// Add product to cart
cartRouter.post('/add', ShoppingCartMiddleware.validateProductId, ShoppingCartController.addProductToCart);

// Get unique cartId
cartRouter.get('/generateUniqueId', ShoppingCartController.generateCartId);

// Get products in shopping cart
cartRouter.get('/', ShoppingCartMiddleware.validateShoppingCartId, ShoppingCartController.getCartProducts);

// Remove a product from the shopping cart
cartRouter.delete(
  '/removeProduct/:itemId',
  ShoppingCartMiddleware.validateShoppingCartId,
  ShoppingCartMiddleware.validateItemId,
  ShoppingCartController.removeProduct,
);

export default cartRouter;
