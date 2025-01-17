import express from 'express';
import cors from 'cors';
import pino from 'pino';
import dotenv from 'dotenv';

// Загружаем переменные окружения
dotenv.config();

const logger = pino();

export function setupServer() {
  const app = express();

  // Настройка CORS
  app.use(cors());

  // Логгирование запросов
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  // Обработка несуществующих роутов
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Получаем порт из переменной окружения или используем 3000 по умолчанию
  const PORT = Number(process.env.PORT) || 3000;

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
