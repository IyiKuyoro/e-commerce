import ResponseHelper from '../helpers/ResponseHelper';
import CategoryService from '../services/CategoryService';
import RedisClient from '../helpers/RedisClient';

export default class CategoryController {
  /**
   * @description Get the list of categories
   * @param  {} req
   * @param  {} res
   */
  static async getCategoriesList(req, res) {
    try {
      const redisKey = `category:${req.originalUrl}`;

      await RedisClient.getAsync(redisKey)
        .then(async data => {
          if (data) {
            const cachedRes = JSON.parse(data);
            ResponseHelper.successWithData(cachedRes, res);
          } else {
            const result = await CategoryService.getCategories(req.params.departmentId);

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
