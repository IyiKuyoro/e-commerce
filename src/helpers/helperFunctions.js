import jwt from 'jsonwebtoken';

import config from '../configs';

/**
 * @description generate a json web token with the passed payload
 * @param  {object} payload
 * @param  {string} duration
 */
const tokenGenerator = (payload, duration) => jwt.sign(payload, config.SECRETE, { expiresIn: duration });

export default tokenGenerator;
