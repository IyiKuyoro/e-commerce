import express from 'express';
import swaggerui from 'swagger-ui-express';
import cors from 'cors';

import config from './configs';
import logger from './helpers/logger';
import appRouter from './router';
import passportSetup from './configs/passportConfig';
import swaggerSpec from './configs/swaggerSetup';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passportSetup.initialize());
app.use(passportSetup.session());

app.use('/api/v1/docs', swaggerui.serve, swaggerui.setup(swaggerSpec));
app.use('/api/v1/', appRouter);
app.use('/', swaggerui.serve, swaggerui.setup(swaggerSpec));

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
