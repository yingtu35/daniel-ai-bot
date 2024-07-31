import { client } from './client.js';
import openAIChat from '../openai/chat.js';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleEvent = async (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    }
    const response = await openAIChat(event.message.text);
    if (!response) {
        return Promise.resolve(null);
    }
    // create an echoing text message
    const echo = { type: 'text', text: response };
    // use reply API
    return client.replyMessage({
        replyToken: event.replyToken,
        messages: [echo],
    });
};
export default handleEvent;
//# sourceMappingURL=index.js.map