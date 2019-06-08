import { Router } from 'express';

import ProductMiddlewares from '../middlewares/ProductMiddlewares';
import ProductsController from '../controllers/ProductsController';

const productRouter = Router();

productRouter.get('/', ProductMiddlewares.validateParams, ProductsController.getProducts);

export default productRouter;
