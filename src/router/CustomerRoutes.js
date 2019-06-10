import { Router } from 'express';
import CustomerMiddlewares from '../middlewares/CustomerMiddlewares';
import CustomerControllers from '../controllers/CustomerController';

const customerRouter = Router();

customerRouter.post(
  '/',
  CustomerMiddlewares.checkRequiredParams,
  CustomerMiddlewares.validateParams,
  CustomerMiddlewares.checkAvailableEmail,
  CustomerControllers.registerCustomer,
);

export default customerRouter;
