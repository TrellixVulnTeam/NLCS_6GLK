const mongoose = require('mongoose');
const moment = require('moment-timezone');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const songSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    index:true,
    sparse:true,
    required: [true, 'Bạn cần phải nhập tên bài hát!!!']
  },
  img: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Bạn cần phải tải ảnh lên!!!']
  },
  audio: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Bạn cần phải tải audio lên!!!']
  },
  playlists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "playlist",
    unique: false
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  isChecked: { type: Boolean, Default: false },
  isPublic: { type: Boolean, Default: false },
},
  { timestamps: true });
songSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const song = mongoose.model('song', songSchema);
module.exports = song;
