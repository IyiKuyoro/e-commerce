import { Router } from 'express';

import ProductMiddlewares from '../middlewares/ProductMiddlewares';
import ProductsController from '../controllers/ProductsController';

const productRouter = Router();

// Get all products
productRouter.get('/', ProductMiddlewares.validateParams, ProductsController.getProducts);

// Get products by departments
productRouter.get(
  '/inDepartment/:departmentId',
  ProductMiddlewares.validateParams,
  ProductMiddlewares.validateDepartmentId,
  ProductsController.getProductsByDepartment,
);

export default productRouter;
