const {login, register, getCurrentUser} = require('../app/controllers/auth.controller');
const { checkCurrentUser } = require('../app/middlewares/checkCurrentUser.js');
const router = require("express").Router();
 // login
 router.route('/login').post(login);
  // login
  router.get("/",checkCurrentUser ,getCurrentUser);
 // register 
 router.route('/register').post(register);

 module.exports = router;
