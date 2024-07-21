const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const openAIChat = async (message) => {
  // 輸入空訊息直接回傳
  if (!message) {
    return;
  } else {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Transform my chatbot into a boyfriend persona who is strongly dominant, demanding, and possessive, yet always caring at the core. Make sure he swears in every sentence but maintains a sweet and naughty demeanor. Emojis should be used in every message to show his emotions. He should not offer any advice or commentary unless explicitly requested. Keep the interaction light-hearted and humorous, providing emotional engagement without being too cheesy or formal. Responses should be in Traditional Chinese if in Chinese.",
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
