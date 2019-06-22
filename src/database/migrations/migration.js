import fs from 'fs';
import bcrypt from 'bcrypt';
import Logger from '../../helpers/logger';
import connection from './connection';
import config from '../../configs';

const logError = error => {
  Logger.error(`Could not read file: ${error.message}`);
  process.exit(1);
};

const createTestUser = () => {
  const password = bcrypt.hashSync('password', 10);
  connection.query(
    `INSERT INTO 
      customer (name, email, password, address_1, city, region, country, postal_code, shipping_region_id)
      VALUES ("test", "test@user.com", "${password}", "address", "city", "region", "country", "12345", 3)`,
    error => {
      if (error) {
        logError(error);
      }
      Logger.info('Test User added');
      Logger.info('Migrations Completed');
      process.exit(0);
    },
  );
};

const executeQuery = query => {
  connection.query(`${query}`, err => {
    if (err) {
      logError(err);
    }

    if (config.ENV === 'test') {
      createTestUser();
    } else {
      Logger.info('Migrations Completed');
      process.exit(0);
    }
  });
};

const migrate = () => {
  fs.readFile(`${process.cwd()}/src/database/migrations/tshirtshop.sql`, 'utf8', (error, query) => {
    if (error) {
      logError(error);
    }

    executeQuery(query);
  });
};

migrate();
