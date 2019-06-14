export default class GoogleAuthController {
  /**
   * @description Send error response on google auth
   * @param  {} req
   * @param  {} res
   */
  static error(req, res) {
    res.status(401).json({
      success: false,
      message: 'Could not authenticate with google',
    });
  }

  /**
   * @description Send success response on google auth
   * @param  {} req
   * @param  {} res
   */
  static success(req, res) {
    res.status(200).json({
      success: true,
      customer: {
        schema: req.user,
      },
    });
  }
}
