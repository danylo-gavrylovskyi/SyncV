const mongoose = require("mongoose");
const mongoConnection = require("./configs/mongoConnection");

mongoose.connect(mongoConnection);

const dbConnection = mongoose.connection;

dbConnection.on("error", () => console.error("MongoDB connection error:"));

dbConnection.once("open", () => console.log("Connected to MongoDB"));

module.exports = mongoose;
