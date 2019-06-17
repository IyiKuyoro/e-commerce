import { Router } from 'express';

import productRouter from './productsRouter';
import customerRouter from './CustomerRoutes';
import departmentRouter from './departmentRouter';
import categoryRouter from './categoryRouter';
import googleAuthRouter from './googleAuthRouter';
import shoppingCart from './shoppingCartRoutes';

const appRouter = Router();

appRouter.use('/products', productRouter);
appRouter.use('/customers', customerRouter);
appRouter.use('/departments', departmentRouter);
appRouter.use('/categories', categoryRouter);
appRouter.use('/auth', googleAuthRouter);
appRouter.use('/shoppingcart', shoppingCart);

export default appRouter;
