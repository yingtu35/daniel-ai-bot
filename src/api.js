const express = require("express");
const openAIChat = require("./utils/openai");

const router = express.Router();

router.get("/test", async (req, res) => {
  const { messages } = req.body;

  if (!messages) {
    res.status(400).send({
      error: "Message is required",
    });
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
