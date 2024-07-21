const OpenAI = require("openai");
const transformMessages = require("./helper");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const openAIChat = async (message) => {
  // 輸入空訊息直接回傳
  if (!message) {
    return;
  } else {
    // 轉換成 openai 格式
    // messages = transformMessages(messages);
    // 呼叫 openai api
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You will be provided with a message, and your task is to respond using emojis only.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "gpt-4o-mini",
      max_tokens: 200,
      temperature: 0.9,
    });
    return completion.choices[0].message.content;
  }
};

module.exports = openAIChat;
