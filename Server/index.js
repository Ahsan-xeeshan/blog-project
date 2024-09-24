const express = require("express");
const route = require("./routes");
const cors = require("cors");
const dbConnection = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const path = require("path");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(route);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  console.log(path.join(__dirname, "client", "dist", "index.html"));
  res.sendFile(path.resolve("/opt/render/project/src/client/dist/index.html"));
});

dbConnection();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
