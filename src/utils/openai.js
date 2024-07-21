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
            "Respond to me as a my borfriend, with a good sense of humor and emotional support. I want our conversations to be natural and sincere, without being overly mushy or intense. Please use emojis to show your emotions in each message. I do not need any unsolicited advice or commentary unless I specifically ask for it.",
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
