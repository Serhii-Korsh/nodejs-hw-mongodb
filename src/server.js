import express from 'express';
import cors from 'cors';
import pino from 'pino';
import dotenv from 'dotenv';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';

import { UPLOAD_DIR } from './constants/index.js'; /* Реалізація завантаження */

import { swaggerDocs } from './middlewares/swaggerDocs.js';

dotenv.config();

const logger = pino();

export function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  app.use('/api-docs', swaggerDocs());
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.use('/uploads', express.static(UPLOAD_DIR)); /* Реалізація завантаження */

  const PORT = Number(process.env.PORT) || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
