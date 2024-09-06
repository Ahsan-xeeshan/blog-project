const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/dbConnection");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dbConnection();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
