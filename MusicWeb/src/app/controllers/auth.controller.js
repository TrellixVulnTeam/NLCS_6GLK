const db = require("../models");
const User = db.user;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = async (req,res,next) =>{
    try{     
        const {img} = req.files;
        img.mv("./myapp/src/public/uploads/img/user/" + img.name);
        const user = await User.create(
            {
                name: req.body.name,
                password: req.body.password,
                img: img.name
            }
            );
       
        const token = jwt.sign({userId: user._id},process.env.APP_SECRET);
        res.status(200).json({
            status:'success',
            data: {token, name: user.name}
        });
    }catch(error){
        next(error);
    }
}
exports.login = async (req,res,next) =>{
    try{
        const user = await User.findOne({name: req.body.name});
        if(!user){
            // Error: Name is not correct
            const err = new Error('Tên user không chính xác!!!');
            err.statusCode = 400;
            return next(err);
        } 
        if(bcrypt.compareSync(req.body.password,user.password)){
                const token = jwt.sign({userId: user._id},process.env.APP_SECRET);
                res.status(200).json({
                    status: 'success',
                    data: {token, name: user.name,img: user.img,
                        songs: user.songs, playlists: user.playlists
                    }
                });
        }else{
            // Error: Password is not correct
            const err = new Error('Mật khẩu không chính xác!!!');
            err.statusCode = 400;
            return next(err);
        }
    }catch(error){
        res.json(error);
    }
}

module.exports.getCurrentUser = async (req, res, next) => {
    try{
      let data = {user: null};
      if(req.user){
         
        const user = await User.findOne({_id: req.user.userId});
        data = {user};
      }
      res.status(200).json({
        status: 'success!!!',
        data: data
      });
    }catch(error){
      res.json(error)
    }   
  };

