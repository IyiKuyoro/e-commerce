import jwt from 'jsonwebtoken';

import config from '../configs';

/**
 * @description generate a json web token with the passed payload
 * @param  {object} payload
 * @param  {string} duration
 */
export function tokenGenerator(payload, duration) {
  return jwt.sign(payload, config.SECRETE, { expiresIn: duration });
}
/**
 * @description This method checks if an object contains a number of properties
 * @param  {object} obj The object to be searched
 * @param  {array} params The list of properties to be searched for
 * @returns {object} An object that contains a valid (bool) and invalidMessages (array) property
 */
export function checkProps(obj, ...params) {
  const missingParams = [];

  params.forEach(property => {
    if (!obj[property] || !obj[property].trim()) {
      missingParams.push(property);
    }
  });

  return missingParams;
}
