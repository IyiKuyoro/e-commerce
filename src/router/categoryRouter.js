import { Router } from 'express';

import CategoryController from '../controllers/CategoryController';
import DepartmentMiddlewares from '../middlewares/DepartmentMiddlewares';

const categoryRouter = Router();

// Get list of all categories
categoryRouter.get(
  '/inDepartments/:departmentId',
  DepartmentMiddlewares.validateDepartmentId,
  DepartmentMiddlewares.checkDepartmentExists,
  CategoryController.getCategoriesList,
);

export default categoryRouter;
