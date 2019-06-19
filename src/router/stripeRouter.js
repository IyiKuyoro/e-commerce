import { Router } from 'express';

import CustomerMiddleware from '../middlewares/CustomerMiddlewares';
import OrderMiddleware from '../middlewares/OrderMiddlewares';
import StripeController from '../controllers/StripeController';

const stripeRouter = Router();

stripeRouter.post(
  '/charge/:orderId',
  CustomerMiddleware.validateCustomerToken,
  OrderMiddleware.validateOrderId,
  StripeController.charge,
);

export default stripeRouter;
