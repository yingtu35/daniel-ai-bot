require("dotenv").config();

const express = require("express");
const api = require("./api");

const app = express();

app.use("/", api);

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page did not exist" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
