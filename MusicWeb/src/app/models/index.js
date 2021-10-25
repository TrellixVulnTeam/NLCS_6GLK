const dbConfig = require("../../config/db/");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = {
    song: require('./song'),
    playlist: require("./playlist"),
    user: require("./user"),
    Report: require("./report")
};