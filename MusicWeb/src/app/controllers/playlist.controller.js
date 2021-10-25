const db = require("../models");
const user = require("../models/user");
const Playlist = db.playlist;
const User = db.user;
const Song = db.song;

// Create and Save a new playlist 
exports.createOnePlaylist = async (req, res, next) => {
try{
  const {userId} = req.user;
  const { img } = req.files;
  const playlists = await Playlist.create(
    {
      ...req.body,
      name: req.body.name,
      isPublic: req.body.isPublic,
      img: img.name,
      user: userId
    }
  );
  await user.findByIdAndUpdate(userId, 
    { $push: { playlists: playlists._id } },
    { new: true, useFindAndModify: false }
    ); 
  img.mv("./myapp/src/public/uploads/img/playlist/" + img.name);
  res.status(200).json({
    status: 'success',
    data:{playlists}
  }
  );
}catch(error){
  next(error);
} 
 }; 

// Get alls playlists
exports.getAllPlaylists = async (req, res, next) => {
  try{
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    const playlists = await Playlist.find(condition).populate('user', 'name'); 
    res.status(200).json({
      status: 'success',
      resulsts: playlists.length,
      data:{playlists}
    }
    )
  }catch(error){
    res.json(error)
  } 
}




// Find a single playlist  with an id
exports.getOnePlaylist = async (req, res, next) => {
  try{
    const id = req.params.id;
    const playlists = await Playlist.findById(id);
    res.status(200).json({
      status: 'success',
      resulsts: playlists.length,
      data:{playlists}
    }
    );
  }catch(error){
    res.json(error)
  } 
};

// Update a playlist by the id in the request
exports.updateOnePlaylist = async (req, res, next) => {
    try{
      const id = req.params.id;
      const playlists = await Playlist.findByIdAndUpdate(id,{...req.body},{new: true, runValidator:true});
      res.status(200).json({
        status: 'success',
        data:{playlists}
      }
      );
    }catch(error){
      // next(error);
      res.json(error)
    } 
};

// Delete a playlist with the specified id in the request
exports.deleteOnePlaylist = async (req, res, next) => {
  try{
    const id = req.params.id;
    await Playlist.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
      message: 'playlist was deleted successfully!'
    });
  }catch(error){
    next(error);
  }  
};


// Get all published playlist
exports.getAllPlaylistsPublished = async (req, res, next) => {   
    try{
      const playlists = await Playlist.find({isPublic: true});
      res.status(200).json({
        status: 'success',
        resulsts: playlists.length,
        data:{playlists}
      });
    }catch(error){
      res.json(error)
    }
};

// Get all no published playlist
exports.getAllPlaylistsNoPublished = async (req, res, next) => {   
  try{
    const playlists = await Playlist.find({isPublic: false});
    res.status(200).json({
      status: 'success',
      resulsts: playlists.length,
      data:{playlists}
    });
  }catch(error){
    res.json(error)
  }
};
exports.addSongToPlaylist = async (req, res, next) =>{

}
