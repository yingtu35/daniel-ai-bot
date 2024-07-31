import express from 'express';
import openAIChat from './openai/chat.js';
import * as line from '@line/bot-sdk';
import handleEvent from './line/index.js';
const router = express.Router();
// create LINE SDK config from env variables
const config = {
    channelSecret: process.env.CHANNEL_SECRET,
};
router.post('/callback', line.middleware(config), async (req, res) => {
    try {
        const result = await Promise.all(req.body.events.map(handleEvent));
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
});
const jsonParser = express.json();
router.get('/test', jsonParser, async (req, res) => {
    const { message } = req.body;
    if (!message) {
        res.send({ error: 'No messages provided' });
        return;
    }
    try {
        const response = await openAIChat(message);
        res.send(response);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).send({ error: error.name });
    }
});
export default router;
//# sourceMappingURL=api.js.map