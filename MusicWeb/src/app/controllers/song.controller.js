const db = require("../models");
const fs = require('fs');
const Song = db.song;
const User = db.user;
exports.createOneSong = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { audio } = req.files;
    const { img } = req.files;

    const Songs = await Song.create(
      {
        ...req.body,
        name: req.body.name,
        isPublic: req.body.isPublic,
        audio: audio.name,
        img: img.name,
        user: userId
      }
    );

    await User.findByIdAndUpdate(userId,
      { $push: { songs: Songs._id } },
      { new: true, useFindAndModify: false }
    );
    audio.mv("./myapp/src/public/uploads/audio/" + audio.name);
    img.mv("./myapp/src/public/uploads/img/song/" + img.name);
    res.status(200).json({
      status: 'success',
      data: { Songs }
    }
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllSongs = async (req, res, next) => {
  try {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    const songs = await Song.find(condition).populate('user', 'name');
    res.status(200).json({
      status: 'success',
      resulsts: songs.length,
      data: { songs }
    }
    );
  } catch (error) {
    res.json(error)
  }
};

exports.getOneSong = async (req, res, next) => {
  try {
    const id = req.params.id;
    const songs = await Song.findById(id);
    res.status(200).json({
      status: 'success',
      resulsts: songs.length,
      data: { songs }
    }
    );
  } catch (error) {
    res.json(error)
  }
};

exports.updateOneSong = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const songs = await Song.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidator: true });
    res.status(200).json({
      status: 'success',
      data: { songs }
    }
    );
  } catch (error) {
    next(error);
  }
};
exports.updateImgOneSong = async (req, res, next) => {
  try {
    const id = req.params.id;
    const songsOld = await Song.findById(id);
    console.log(req.body.images);
    const songs = await Song.findByIdAndUpdate(id, {...req.body, img: req.body.images.img.name  }, { new: true, runValidator: true });
    fs.unlinkSync("./myapp/src/public/uploads/img/song/" + songsOld.img);
    res.status(200).json({
      status: 'success',
      data: { songs }
    }
    );
  } catch (error) {
    next(error);
  }
};
exports.uploadImgOneSong = async (req, res, next) => {
  try {
    const { img } = req.files;
    img.mv("./myapp/src/public/uploads/img/song/" + img.name);
    res.status(200).json({ img });
  } catch (error) {
    next(error);
  }
};

exports.deleteOneSong = async (req, res, next) => {

  try {
    const id = req.params.id;
    const songs = await Song.findById(id);
    await Song.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
      message: 'Song was deleted successfully!'
    });
    fs.unlinkSync("./myapp/src/public/uploads/img/song/" + songs.img);
    fs.unlinkSync("./myapp/src/public/uploads/audio/" + songs.audio);
  } catch (error) {
    next(error);
  }
};

exports.getAllSongsPublished = async (req, res, next) => {
  try {
    const songs = await Song.find({ isPublic: true, isChecked: true });
    res.status(200).json({
      status: 'success',
      resulsts: songs.length,
      data: { songs }
    });
  } catch (error) {
    res.json(error)
  }
};
exports.getAllSongsNoChecked = async (req, res, next) => {
  try {
    const songs = await Song.find({ isChecked: false });
    res.status(200).json({
      status: 'success',
      resulsts: songs.length,
      data: { songs }
    });
  } catch (error) {
    res.json(error)
  }
};

exports.getAllSongsNoPublished = async (req, res, next) => {
  try {
    const songs = await Song.find({ isPublic: false, isChecked: true });
    res.status(200).json({
      status: 'success',
      resulsts: songs.length,
      data: { songs }
    });
  } catch (error) {
    res.json(error)
  }
};




