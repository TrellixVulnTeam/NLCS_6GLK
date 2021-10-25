const db = require("../models");
const User = db.user;
const Playlists = db.playlist;
const Songs = db.song;

// Create and Save a new user
module.exports.createOneUser = async (req, res, next) => {
  try{
    const user = await User.create({...req.body});
    res.status(200).json({
      status: 'success',
      data:{user}
    }
    );
  }catch(error){
    next(error);
  } 
};

// Retrieve all users from the database.
module.exports.getAllUsers = async (req, res, next) => {
  try{
    const user = await User.find({});
    res.status(200).json({
      status: 'success',
      data:{user}
    }
    );
  }catch(error){
    res.json(error)
  } 
};

// Find a single user with an id
module.exports.getOneUser = async (req, res, next) => {

  try{
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json({
      status: 'success',
      data:{user}
    }
    );
  }catch(error){
    res.json(error)
  }   
};

// Update a user by the id in the request
module.exports.updateOneUser = async (req, res, next) => {

    try{
      const id = req.params.id;
      const user = await User.findByIdAndUpdate(id,{...req.body},{new: true, runValidator:true});
      console.log(user);  
      res.status(200).json({
        status: 'success',
        data:{user}
      }
      );
    }catch(error){
      next(error);
    } 
};
// Delete a user with the specified id in the request
module.exports.deleteOneUser = async (req, res, next) => {
  try{
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
      message: 'User was deleted successfully!'
    });
  }catch(error){
    next(error);
  }  
};






