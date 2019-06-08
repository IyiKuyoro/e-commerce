import ResponseHelper from '../helpers/ResponseHelper';
import ProductServices from '../services/ProductServices';

export default class ProductsController {
  /**
   * @description Get products from catalog {paginated}
   * @param  {Object} req The http request object
   * @param  {Object} res The http response object
   */
  static async getProducts(req, res) {
    try {
      const { page, limit, descriptionLength } = req.query;
      const results = await ProductServices.getProducts(page, limit, descriptionLength);
      const counts = await ProductServices.getProductsCounts();

      const pageMeta = {
        page: page || 1,
        totalPages: Math.ceil(counts / (limit || 20)),
        pageSize: results.length,
        totalProducts: counts,
      };

      res.status(200).json({
        success: true,
        count: results.length,
        pageMeta,
        rows: results,
      });
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }
}
