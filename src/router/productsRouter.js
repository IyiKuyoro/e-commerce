import { Router } from 'express';

import ProductMiddlewares from '../middlewares/ProductMiddlewares';
import ProductsController from '../controllers/ProductsController';
import DepartmentMiddlewares from '../middlewares/DepartmentMiddlewares';
import CategoryMiddlewares from '../middlewares/CategoryMiddlewares';

const productRouter = Router();

// Get all products
productRouter.get('/', ProductMiddlewares.validateParams, ProductsController.getProducts);

// Get products by departments
productRouter.get(
  '/inDepartment/:departmentId',
  ProductMiddlewares.validateParams,
  DepartmentMiddlewares.validateDepartmentId,
  DepartmentMiddlewares.checkDepartmentExists,
  ProductsController.getProductsByDepartment,
);

// Get products by categories
productRouter.get(
  '/inCategories/:categoryId',
  ProductMiddlewares.validateParams,
  CategoryMiddlewares.validateCategoryId,
  CategoryMiddlewares.checkCategoryExists,
  ProductsController.getProductsByCategory,
);

export default productRouter;
