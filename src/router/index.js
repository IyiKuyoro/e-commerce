import { Router } from 'express';

import productRouter from './productsRouter';
import customerRouter from './CustomerRoutes';
import departmentRouter from './departmentRouter';

const appRouter = Router();

appRouter.use('/products', productRouter);
appRouter.use('/customers', customerRouter);
appRouter.use('/departments', departmentRouter);

export default appRouter;
