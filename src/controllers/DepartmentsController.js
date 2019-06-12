import ResponseHelper from '../helpers/ResponseHelper';
import DepartmentService from '../services/DepartmentService';

export default class DepartmentsController {
  /**
   * @description Get the list of departments
   * @param  {} req
   * @param  {} res
   */
  static async getDepartmentList(req, res) {
    try {
      const result = await DepartmentService.getDepartmentList();

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
