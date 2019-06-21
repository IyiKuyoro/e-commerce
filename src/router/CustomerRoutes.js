import { Router } from 'express';
import CustomerMiddlewares from '../middlewares/CustomerMiddlewares';
import CustomerControllers from '../controllers/CustomerController';

const customerRouter = Router();

// Register a new customer
customerRouter.post(
  '/',
  CustomerMiddlewares.checkRequiredRegParams,
  CustomerMiddlewares.validateParams,
  CustomerMiddlewares.checkAvailableEmail,
  CustomerControllers.registerCustomer,
);

// Login an already registered user
customerRouter.post(
  '/login',
  CustomerMiddlewares.checkRequiredLoginParams,
  CustomerMiddlewares.validLoginParams,
  CustomerControllers.loginCustomer,
);

// Edit customer address
customerRouter.put(
  '/address',
  CustomerMiddlewares.validateCustomerToken,
  CustomerMiddlewares.validateRequiredAddressParams,
  CustomerControllers.updateCustomerAddress,
);

customerRouter.get('/', CustomerMiddlewares.validateCustomerToken, CustomerControllers.getLoggedInCustomerInfo);

export default customerRouter;
