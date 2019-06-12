import { Router } from 'express';

import DepartmentController from '../controllers/DepartmentsController';

const departmentRouter = Router();

// Get list of all departments
departmentRouter.get('/', DepartmentController.getDepartmentList);

export default departmentRouter;
