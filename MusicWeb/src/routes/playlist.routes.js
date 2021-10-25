    const express = require('express');
    const { getAllPlaylists,getOnePlaylist ,createOnePlaylist, updateOnePlaylist, deleteOnePlaylist, getAllPlaylistsPublished, getAllPlaylistsNoPublished} = require("../app/controllers/playlist.controller.js");
    const router = require("express").Router();
    const {verifyToken} = require("../app/middlewares/verifyToken.js");
    // Create a new playlist
    router.route("/").post(verifyToken,createOnePlaylist)
  
    // Retrieve all playlist
    router.get("/", getAllPlaylists);
    
    // Retrieve all published playlist
    router.get("/published", getAllPlaylistsPublished);
    
    // Retrieve all published playlist
    router.get("/nopublished",verifyToken , getAllPlaylistsNoPublished);

    // Retrieve a single playlist with id
    router.get("/:id", getOnePlaylist);
  
    // Update a playlist with id
    router.put("/:id",verifyToken , updateOnePlaylist);
  
    // Delete a playlist with id
    router.delete("/:id",verifyToken , deleteOnePlaylist);
    
module.exports = router;

  