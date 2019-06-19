import { Router } from 'express';

import productRouter from './productsRouter';
import customerRouter from './CustomerRoutes';
import departmentRouter from './departmentRouter';
import categoryRouter from './categoryRouter';
import googleAuthRouter from './googleAuthRouter';
import shoppingCart from './shoppingCartRoutes';
import shippingRouter from './shippingRouter';
import taxRouter from './taxRouter';
import orderRouter from './orderRouter';
import stripeRouter from './stripeRouter';

const appRouter = Router();

appRouter.use('/products', productRouter);
appRouter.use('/customers', customerRouter);
appRouter.use('/departments', departmentRouter);
appRouter.use('/categories', categoryRouter);
appRouter.use('/auth', googleAuthRouter);
appRouter.use('/shoppingcart', shoppingCart);
appRouter.use('/shipping', shippingRouter);
appRouter.use('/tax', taxRouter);
appRouter.use('/orders', orderRouter);
appRouter.use('/stripe', stripeRouter);

export default appRouter;
