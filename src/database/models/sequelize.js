import Sequelize from 'sequelize';

import config from '../../configs';

const dbConfig = {
  username: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE,
  host: config.DATABASE_HOST,
  dialect: config.DATABASE_DIALECT,
};

const sequelize = new Sequelize(config.DATABASE, config.DATABASE_USERNAME, config.DATABASE_PASSWORD, dbConfig);

export default sequelize;
