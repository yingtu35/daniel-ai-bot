const express = require("express");
const openAIChat = require("./utils/openai");
const line = require("@line/bot-sdk");
const handleEvent = require("./utils/line");

const router = express.Router();

// create LINE SDK config from env variables
const config = {
  channelSecret: process.env.CHANNEL_SECRET,
};

router.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

const jsonParser = express.json();

router.get("/test", jsonParser, async (req, res) => {
  const { message } = req.body;

  if (!message) {
    res.send({ error: "No messages provided" });
    return;
  }

  try {
    const response = await openAIChat(message);
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: error.name });
  }
});

module.exports = router;
