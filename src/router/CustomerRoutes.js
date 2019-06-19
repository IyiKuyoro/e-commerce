import { Router } from 'express';
import CustomerMiddlewares from '../middlewares/CustomerMiddlewares';
import CustomerControllers from '../controllers/CustomerController';

const customerRouter = Router();

customerRouter.post(
  '/',
  CustomerMiddlewares.checkRequiredRegParams,
  CustomerMiddlewares.validateParams,
  CustomerMiddlewares.checkAvailableEmail,
  CustomerControllers.registerCustomer,
);

customerRouter.post(
  '/login',
  CustomerMiddlewares.checkRequiredLoginParams,
  CustomerMiddlewares.validLoginParams,
  CustomerControllers.loginCustomer,
);

customerRouter.put(
  '/address',
  CustomerMiddlewares.validateCustomerToken,
  CustomerMiddlewares.validateRequiredAddressParams,
  CustomerControllers.updateCustomerAddress,
);

customerRouter.get('/', CustomerMiddlewares.validateCustomerToken, CustomerControllers.getLoggedInCustomerInfo);

export default customerRouter;
