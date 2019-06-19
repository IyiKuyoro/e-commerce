import { Router } from 'express';
import TaxMiddleware from '../middlewares/TaxMiddleware';
import TaxController from '../controllers/TaxController';

const taxRouter = Router();

// Get tax info
taxRouter.get('/:taxId', TaxMiddleware.validateTaxId, TaxController.getTaxById);

export default taxRouter;
