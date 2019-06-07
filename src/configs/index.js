import dotenv from 'dotenv';

dotenv.config();

const config = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'test': {
      return {
        ENV: 'test',
        PORT: process.env.PORT,
        LOGGY_TOKEN: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        LOGGY_SUBDOMAIN: 'subdomain',
      };
    }
    case 'prod': {
      return {
        ENV: 'production',
        PORT: process.env.PORT,
        LOGGY_TOKEN: process.env.LOGGY_TOKEN,
        LOGGY_SUBDOMAIN: process.env.LOGGY_SUBDOMAIN,
      };
    }
    default: {
      return {
        ENV: 'development',
        PORT: process.env.PORT,
        LOGGY_TOKEN: process.env.LOGGY_TOKEN,
        LOGGY_SUBDOMAIN: process.env.LOGGY_SUBDOMAIN,
      };
    }
  }
};

export default config();
