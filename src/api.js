const express = require("express");
const openAIChat = require("./utils/openai");
const line = require("@line/bot-sdk");

// create LINE SDK config from env variables
const config = {
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const router = express.Router();

router.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  const response = await openAIChat([event.message.text]);

  // create an echoing text message
  const echo = { type: "text", text: response };

  // use reply API
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [echo],
  });
}

// router.get("/test", async (req, res) => {
//   const { messages } = req.body;

//   if (!messages) {
//     res.send({ error: "No messages provided" });
//     return;
//   }

//   try {
//     const response = await openAIChat(messages);
//     res.send(response);
//   } catch (error) {
//     res.status(500).send({ error: error.name });
//   }
// });

module.exports = router;
