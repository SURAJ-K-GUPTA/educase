const express = require("express");
require('dotenv').config();
const app = express();
const port = 3000;
const getPool = require('./db/db');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.listen(port, () => {
  console.log(`App listening at Port ${port}`);
});