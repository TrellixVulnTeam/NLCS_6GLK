const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateVietNam = moment.tz(Date.now(), "Asia/Ho_Chi_Minh");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const playlistSchema = new Schema({
    name: { 
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Bạn cần phải nhập tên playlist!!!']
    
    },
    img: { 
      type: String,
      trim: true,
      required: [true, 'Bạn cần phải tải ảnh lên!!!']
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "song"
      }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
    totalSong: {
      type: Number
    },
    isPublic: { type: Boolean, Default: false },
},
{ timestamps: true,  default: dateVietNam});
playlistSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const playlist = mongoose.model('playlist', playlistSchema);
module.exports = playlist;
