const express = require("express");
const path = require("path");

require("dotenv").config();

const api = require("./api");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/", api);

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page did not exist" });
});

app.use((err, req, res) => {
  const status = err.status || 500;
  if (status === 500) {
    console.log("The server errored when processing a request");
    console.log(err);
  }

  res.status(status).send({
    status: status,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
