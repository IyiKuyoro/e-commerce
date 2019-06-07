/* eslint-disable no-console */
import winston from 'winston';
import { Loggly } from 'winston-loggly-bulk';

import config from '../configs';

winston.add(
  new Loggly({
    token: config.LOGGY_TOKEN,
    subdomain: config.LOGGY_TOKEN,
    tags: ['Winston-NodeJS'],
    json: true,
  }),
);

export default class Logger {
  static error(error) {
    if (config.ENV === 'production') {
      winston.log('error', error.message, error);
    } else {
      console.log(error);
    }
  }

  static info(text) {
    if (config.ENV === 'production') {
      winston.log('info', text);
    } else {
      console.log(text);
    }
  }
}
