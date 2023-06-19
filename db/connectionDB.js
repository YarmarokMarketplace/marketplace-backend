require('dotenv').config();
const mongoose = require('mongoose');

const { DB_HOST } = process.env;

const connectionDB = async () => {
    mongoose.connect(DB_HOST);
};

module.exports = connectionDB;