import express from 'express';

import config from './configs';
import logger from './helpers/Logger';
import appRouter from './router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
