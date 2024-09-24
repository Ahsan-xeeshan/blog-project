const express = require("express");
const route = require("./routes");
const cors = require("cors");
const dbConnection = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const path = require("path");

const path_name = path.resolve();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(route);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  console.log(path.join(path_name, "client", "dist", "index.html"));
  res.sendFile(path.resolve("/opt/render/project/src/client/dist/index.html"));
});

dbConnection();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
