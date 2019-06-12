import ResponseHelper from '../helpers/ResponseHelper';
import CategoryService from '../services/CategoryService';

export default class CategoryController {
  /**
   * @description Get the list of categories
   * @param  {} req
   * @param  {} res
   */
  static async getCategoriesList(req, res) {
    try {
      const result = await CategoryService.getCategories(req.params.departmentId);

      if (result.length <= 0) {
        res.status(204).json({
          success: true,
          rows: result,
        });
        return;
      }

      ResponseHelper.successWithData(
        {
          rows: result,
        },
        res,
      );
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }
}
