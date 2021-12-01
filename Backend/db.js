require('dotenv').config()
const mongoose = require("mongoose");
const url = process.env.MONGO_URI
// connectiing to the database 
const connectToMongo = async() => {
    await mongoose.connect(url)
    console.log("connected to mongo successfully");
};
module.exports = connectToMongo;
