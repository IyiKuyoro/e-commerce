import { Router } from 'express';

import productRouter from './productsRouter';

const appRouter = Router();

appRouter.use('/products', productRouter);

export default appRouter;
