import mysql from 'mysql2';
import config from '../../configs';

const connection = mysql.createConnection({
  host: config.DATABASE_HOST,
  user: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE,
  multipleStatements: true,
});

export default connection;
