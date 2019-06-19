import { Router } from 'express';
import ShippingController from '../controllers/ShippingController';
import ShippingMiddlewares from '../middlewares/ShippingMiddlewares';

const shippingRouter = Router();

// get shipping regions
shippingRouter.get('/regions', ShippingController.getRegions);

// Get shipping details
shippingRouter.get('/regions/:regionId', ShippingMiddlewares.validateRegionId, ShippingController.getShippingInfo);

export default shippingRouter;
