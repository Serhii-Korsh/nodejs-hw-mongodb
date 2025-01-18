import express from 'express';
import cors from 'cors';
import pino from 'pino';
import dotenv from 'dotenv';
import {
  getContactsHandler,
  getContactByIdHandler,
} from './controllers/contactsController.js';

dotenv.config();

const logger = pino();

export function setupServer() {
  const app = express();

  app.use(cors());

  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  app.get('/contacts', getContactsHandler);

  app.get('/contacts/:contactId', getContactByIdHandler);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = Number(process.env.PORT) || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
