const line = require("@line/bot-sdk");
const openAIChat = require("./openai");

// create LINE SDK client
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const handleEvent = async (event) => {
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  const response = await openAIChat(event.message.text);

  // create an echoing text message
  const echo = {
    altText: "You get a flex message",
    type: "flex",
    contents: event.message.text,
  };

  // use reply API
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [echo],
  });
};

module.exports = handleEvent;
