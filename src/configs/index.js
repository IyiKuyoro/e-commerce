import dotenv from 'dotenv';

dotenv.config();

const config = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'test': {
      return {
        FRONTEND_URL: process.env.FRONTEND_URL,
        STRIPE_SK: 'xxxxxxx',
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
        REDISCLOUD_URL: process.env.REDISCLOUD_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_AUTH_CALLBACK_URL: process.env.GOOGLE_AUTH_CALLBACK_URL,
        SENDGRID_API_KEY: 'xxxxxxxxxxxxxxxxxxx',
      };
    }
    case 'prod': {
      return {
        FRONTEND_URL: process.env.FRONTEND_URL,
        STRIPE_SK: process.env.STRIPE_SK,
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
        REDISCLOUD_URL: process.env.REDISCLOUD_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_AUTH_CALLBACK_URL: process.env.GOOGLE_AUTH_CALLBACK_URL,
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      };
    }
    default: {
      return {
        FRONTEND_URL: process.env.FRONTEND_URL,
        STRIPE_SK: process.env.STRIPE_SK,
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
        REDISCLOUD_URL: process.env.REDISCLOUD_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_AUTH_CALLBACK_URL: process.env.GOOGLE_AUTH_CALLBACK_URL,
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      };
    }
  }
};

export default config();
