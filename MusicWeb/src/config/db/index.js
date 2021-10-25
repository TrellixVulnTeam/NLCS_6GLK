const mongoose = require('mongoose');
const { NULL } = require('node-sass');
const db = require("../../app/models")
async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/music_app_dev', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }); 
    console.log("Connect successfully!");
    }catch(error){
        console.log("Connect failure!");
    }
}
module.exports = {
    connect
};
