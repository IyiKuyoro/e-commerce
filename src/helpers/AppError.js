export default class AppError extends Error {
  /**
   * @description Constructs a new AppError object
   * @param  {string} code
   * @param  {number} statusCode=500
   * @param  {string} message='Server error'
   * @param  {string[]} fields=[]
   */
  constructor(code, statusCode = 500, message = 'Server error', fields = []) {
    super();

    this.code = code;
    this.statusCode = statusCode;
    this.message = message;
    this.fields = fields;
  }
}
