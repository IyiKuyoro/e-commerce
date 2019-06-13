import redis from 'redis';
import bluebird from 'bluebird';
import cron from 'node-cron';
import Logger from './logger';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient();

cron.schedule('* * 1 * *', () => {
  client.flushdb();
  Logger.info('Clearing cache');
});

export default client;
