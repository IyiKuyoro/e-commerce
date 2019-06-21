import express from 'express';
import swaggerui from 'swagger-ui-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import config from './configs';
import logger from './helpers/logger';
import appRouter from './router';
import passportSetup from './configs/passportConfig';
import swaggerSpec from './configs/swaggerSetup';

const app = express();

const corsOptions = {
  origin: config.FRONTEND_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Credentials': 'true',
    'Access-Header-Allow-Methods': 'GET, POST, DELETE',
  });
  res.header('Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use((req, res, next) => {
  if (req.headers['content-type'] === 'text/plain') {
    req.body = JSON.parse(req.body);
  }

  next();
});
app.use(cookieParser());
app.use(passportSetup.initialize());
app.use(passportSetup.session());

app.use('/', swaggerui.serve, swaggerui.setup(swaggerSpec));
app.use('/api/v1/docs', swaggerui.serve, swaggerui.setup(swaggerSpec));
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
