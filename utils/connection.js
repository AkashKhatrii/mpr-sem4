require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.MONGO_URI;
const connection = mongoose.createConnection(url)

module.exports = connection;