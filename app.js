const dotenv = require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

app.use("/api/user", require("./api/routes/users.js"));
app.use("/api/entries", require("./api/routes/entries.js"));

module.exports = app;
