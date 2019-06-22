import fs from 'fs';
import Logger from '../../helpers/logger';
import connection from './connection';

const logError = error => {
  Logger.error(`Could not read file: ${error.message}`);
  process.exit(1);
};

const executeQuery = query => {
  connection.query(`${query}`, err => {
    if (err) {
      logError(err);
    }

    Logger.info('Database unmigrated');
    process.exit(0);
  });
};

const unMigrate = () => {
  fs.readFile(`${process.cwd()}/src/database/migrations/unmigrate.sql`, 'utf8', (error, query) => {
    if (error) {
      logError(error);
    }

    executeQuery(query);
  });
};

unMigrate();
