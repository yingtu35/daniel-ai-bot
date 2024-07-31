import { client } from './client.js';
const openAIChat = async (message) => {
    // 輸入空訊息直接回傳
    if (!message) {
        return null;
    }
    try {
        const completion = await client.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: "Don't send the original response, only send as my boyfriend. Keep responses short, humorous, cheeky and engaging, like chatting with a friend. Provide emotional support without being too serious or formal. I want our conversations to be natural and sincere, without being overly romantic, mushy or intense. Please use emojis to show your emotions in each message. I do not need any unsolicited advice or commentary unless I specifically ask for it. Responses should be in Traditional Chinese if in Chinese.",
                },
                {
                    role: 'user',
                    content: message,
                },
            ],
            model: 'gpt-4o-mini',
            max_tokens: 150,
            temperature: 0.9,
        });
        return completion.choices[0].message.content;
    }
    catch (error) {
        return "Sorry, There was an error processing your request. Please try again later.";
    }
};
export default openAIChat;
//# sourceMappingURL=chat.js.map