import { Router } from 'express';

import ShoppingCartMiddleware from '../middlewares/ShoppingCartMiddleware';
import OrderMiddleware from '../middlewares/OrderMiddlewares';
import TaxMiddleware from '../middlewares/TaxMiddleware';
import CustomerMiddleware from '../middlewares/CustomerMiddlewares';
import OrderController from '../controllers/OrderController';

const orderRouter = Router();

// Create a new order
orderRouter.post(
  '/',
  ShoppingCartMiddleware.validateShoppingCartId,
  OrderMiddleware.checkParams,
  TaxMiddleware.checkTaxExists,
  CustomerMiddleware.validateCustomerToken,
  OrderController.createNewOrder,
);

// Get order short details
orderRouter.get(
  '/shortDetail/:orderId',
  CustomerMiddleware.validateCustomerToken,
  OrderMiddleware.validateOrderId,
  OrderController.getShortDetails,
);

// Get orders for a customer
orderRouter.get('/inCustomer', CustomerMiddleware.validateCustomerToken, OrderController.getOrderByUser);

export default orderRouter;
