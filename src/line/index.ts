import { client } from './client';
import openAIChat from '../openai/chat';
import { Message,  } from '@line/bot-sdk';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleEvent = async (event: any) => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  const response = await openAIChat(event.message.text);
  if (!response) {
    return Promise.resolve(null);
  }

  // create an echoing text message
  const echo: Message = { type: 'text', text: response };

  // use reply API
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [echo],
  });
};

export default handleEvent;
