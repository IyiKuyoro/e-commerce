import ResponseHelper from '../helpers/ResponseHelper';
import DepartmentService from '../services/DepartmentService';
import RedisClient from '../helpers/RedisClient';

export default class DepartmentsController {
  /**
   * @description Get the list of departments
   * @param  {} req
   * @param  {} res
   */
  static async getDepartmentList(req, res) {
    try {
      const redisKey = `department:${req.originalUrl}`;

      await RedisClient.getAsync(redisKey)
        .then(async data => {
          if (data) {
            const cachedRes = JSON.parse(data);
            ResponseHelper.successWithData(cachedRes, res);
          } else {
            const result = await DepartmentService.getDepartmentList();

            if (result.length <= 0) {
              res.status(204).json({
                success: true,
                rows: result,
              });
              return;
            }

            const newRes = {
              rows: result,
            };

            RedisClient.set(redisKey, JSON.stringify(newRes));
            ResponseHelper.successWithData(newRes, res);
          }
        })
        .catch(error => {
          throw error;
        });
    } catch (error) {
      ResponseHelper.serverError(error, res);
    }
  }
}
