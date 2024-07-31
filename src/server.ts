import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import api from './api';

const app = express();

app.use('/', api);

app.use('/health', (req: Request, res: Response) => {
  res.send('OK');
});

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Page did not exist' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
