import dotenv from 'dotenv';

dotenv.config();

const config = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'test': {
      return {
        ENV: 'test',
        PORT: process.env.PORT,
        SECRETE: process.env.SECRETE,
        URL: process.env.URL,
        LOGGY_TOKEN: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        LOGGY_SUBDOMAIN: 'subdomain',
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: null,
        DATABASE: process.env.DATABASE_TEST,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_DIALECT: process.env.DATABASE_DIALECT,
      };
    }
    case 'prod': {
      return {
        ENV: 'production',
        PORT: process.env.PORT,
        SECRETE: process.env.SECRETE,
        URL: process.env.URL,
        LOGGY_TOKEN: process.env.LOGGY_TOKEN,
        LOGGY_SUBDOMAIN: process.env.LOGGY_SUBDOMAIN,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || null,
        DATABASE: process.env.DATABASE,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_DIALECT: process.env.DATABASE_DIALECT,
      };
    }
    default: {
      return {
        ENV: 'development',
        PORT: process.env.PORT,
        SECRETE: process.env.SECRETE,
        URL: process.env.URL,
        LOGGY_TOKEN: process.env.LOGGY_TOKEN,
        LOGGY_SUBDOMAIN: process.env.LOGGY_SUBDOMAIN,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: null,
        DATABASE: process.env.DATABASE_DEV,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_DIALECT: process.env.DATABASE_DIALECT,
      };
    }
  }
};

export default config();
