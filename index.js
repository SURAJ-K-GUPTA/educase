const express = require("express");
require('dotenv').config();
const app = express();
const port = 3000;
const getPool = require('./db/db');
const schoolRoutes = require('./routes/schoolRoutes');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use('/api/school', schoolRoutes);
app.listen(port, () => {
  console.log(`App listening at Port ${port}`);
});