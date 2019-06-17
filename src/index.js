import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import config from './configs';
import logger from './helpers/logger';
import appRouter from './router';
import passportSetup from './configs/passportConfig';

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passportSetup.initialize());
app.use(passportSetup.session());

app.use('/api/v1/', appRouter);

// Listen for wildcard routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      status: 404,
      message: 'This resource does not exist.',
    },
  });
});

app.listen(config.PORT, () => {
  logger.info(`Server is now running on port: ${config.PORT}`);
});

export default app;
