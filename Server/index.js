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

if (process.env.NODE_ENV === "production") {
  //*Set static folder up in production
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.use(route);

dbConnection();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
