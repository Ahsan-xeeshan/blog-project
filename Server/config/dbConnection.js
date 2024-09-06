const mongoose = require("mongoose");
require("dotenv").config();
function dbConnection() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("MongoDB is Connected!"))
    .catch((err) => console.log(err));
}

module.exports = dbConnection;
