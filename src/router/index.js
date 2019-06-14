import { Router } from 'express';

import productRouter from './productsRouter';
import customerRouter from './CustomerRoutes';
import departmentRouter from './departmentRouter';
import categoryRouter from './categoryRouter';
import googleAuthRouter from './googleAuthRouter';

const appRouter = Router();

appRouter.use('/products', productRouter);
appRouter.use('/customers', customerRouter);
appRouter.use('/departments', departmentRouter);
appRouter.use('/categories', categoryRouter);
appRouter.use('/auth', googleAuthRouter);

export default appRouter;
