const mongoose = require("mongoose");
require("dotenv").config();

const { mongoHost, mongoName } = process.env;
const mongoURL = `mongodb://${mongoHost}/${mongoName}`;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("Database connected to localhost: 27017"))
  .catch((err) => console.log(err));
