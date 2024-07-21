require("dotenv").config();

const express = require("express");
const path = require("path");
const api = require("./api");

const app = express();

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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
