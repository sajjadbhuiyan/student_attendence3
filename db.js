const mongoose = require("mongoose");

const connectionDB = (databaseURI) => {
  return mongoose.connect(databaseURI);
};

module.exports = connectionDB;
