    const { getAllUsers, getOneUser, createOneUser, updateOneUser, deleteOneUser} = require("../app/controllers/user.controller.js");
    const {verifyToken} = require("../app/middlewares/verifyToken.js");
    const router = require("express").Router();
    
    // Create a new user
    router.post("/", createOneUser);

    // Retrieve all user
    router.get("/", getAllUsers);
  
    // Retrieve a single user with id
    router.get("/:id", getOneUser);
  
    // Update a user with id
    router.put("/:id",verifyToken ,updateOneUser);
  
    // Delete a user with id
    router.delete("/:id",verifyToken ,deleteOneUser);
  
    module.exports = router;

