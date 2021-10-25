const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const morgan = require('morgan');
const app = express();
app.use(fileUpload({
  createParentPath: true
}))
const {errorHandler} = require("./app/middlewares/errorHandler.js");
const db = require('./config/db');
const route = require('./routes')
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// HTTP logger 
app.use(morgan('combined'));
const PORT = process.env.APP_PORT;
// Connect to DB
db.connect();
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

// Route init
route(app);
app.all('*',(req,res,next)=>{
  const err = new Error('The route can not found');
  err.statusCode = 404;
  next(err);
});
// Unhandled Route
app.use(errorHandler);
app.listen(PORT,() => {
console.log(`Example app listening at http://localhost:${PORT}`)});
