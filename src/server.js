require("dotenv").config();

const express = require("express");
const path = require("path");
const api = require("./api");
const line = require("@line/bot-sdk");

// create LINE SDK config from env variables
const config = {
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const app = express();

app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create an echoing text message
  const echo = { type: "text", text: event.message.text };

  // use reply API
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [echo],
  });
}

const PORT = 3000;

app.use(express.json());

app.use("/", api);

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page did not exist" });
});

app.use((err, req, res) => {
  res.status(err.status || 500).send({
    status: status,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
