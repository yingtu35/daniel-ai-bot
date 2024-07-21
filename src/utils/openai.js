const OpenAI = require("openai");
const transformMessages = require("./helper");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const openAIChat = async (messages) => {
  // 輸入空訊息直接回傳
  if (messages.length == 0) {
    return;
  } else {
    // 轉換成 openai 格式
    messages = transformMessages(messages);
    // 呼叫 openai api
    const completion = await openai.chat.completions.create({
      messages,
      model: "gpt-4o-mini",
      max_tokens: 80,
      temperature: 0.9,
    });
    return completion.choices[0].message.content;
  }
};

module.exports = openAIChat;
