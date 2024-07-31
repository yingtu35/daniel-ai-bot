import express, { Request, Response } from 'express';
import openAIChat from './openai/chat';
import * as line from '@line/bot-sdk';
import handleEvent from './line/index';

const router = express.Router();

// create LINE SDK config from env variables
const config = {
  channelSecret: process.env.CHANNEL_SECRET as string,
};

router.post('/callback', line.middleware(config), async (req: Request, res: Response) => {
  try {
    console.log("callback endpoint called");
    const result = await Promise.all(req.body.events.map(handleEvent));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(200).end();
  }
});

const jsonParser = express.json();

router.get('/test', jsonParser, async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    res.send({ error: 'No messages provided' });
    return;
  }

  try {
    const response = await openAIChat(message);
    res.send(response);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({ error: error.name });
  }
});

export default router;
