const express = require("express");
const openAIChat = require("./utils/openai");

const router = express.Router();

router.get("/callback", async (req, res) => {
  const { messages } = req.body;

  if (!messages) {
    res.send({ error: "No messages provided" });
    return;
  }

  try {
    const response = await openAIChat(messages);
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: error.name });
  }
});

module.exports = router;
