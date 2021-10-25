    const { getAllSongs,getOneSong, createOneSong, updateOneSong,uploadImgOneSong,updateImgOneSong, deleteOneSong, getAllSongsPublished, getAllSongsNoPublished} = require("../app/controllers/song.controller.js");
    const {verifyToken} = require("../app/middlewares/verifyToken.js");
    const router = require("express").Router();
  
    // Create a new song
    router.post("/",verifyToken, createOneSong);
    router.post("/upload",verifyToken, uploadImgOneSong);

    // Retrieve all song
    router.get("/", getAllSongs);
  
    // Retrieve all published song
    router.get("/published", getAllSongsPublished);
  
    // Retrieve all no published song
    router.get("/nopublished",verifyToken , getAllSongsNoPublished);

    // Retrieve a single song with id
    router.get("/:id", getOneSong);
  
    // Update a song with id
    router.put("/:id",verifyToken ,updateOneSong);
    router.put("/update/:id",verifyToken ,updateImgOneSong);
    // Delete a song with id
    router.delete("/:id",verifyToken ,deleteOneSong);

    module.exports = router;


