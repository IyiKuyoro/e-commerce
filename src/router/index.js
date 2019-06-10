import { Router } from 'express';

import productRouter from './productsRouter';
import customerRouter from './CustomerRoutes';

const appRouter = Router();

appRouter.use('/products', productRouter);
appRouter.use('/customers', customerRouter);

export default appRouter;
