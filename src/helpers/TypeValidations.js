export default class TypeValidations {
  /**
   * @description Check that the listed params are numbers
   * @param  {Object} obj
   * @param  {string} ...params
   */
  static validateParamsAsNumbers(obj, ...params) {
    const erroredParams = [];
    const numRegex = /^0*?[1-9]+[0-9]*$/;

    params.forEach(property => {
      if (obj[property] && !numRegex.test(obj[property])) {
        erroredParams.push(property);
      }
    });

    return erroredParams;
  }
}
