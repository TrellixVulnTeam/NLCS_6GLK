const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const ObjectId = Schema.ObjectId;
const userSchema = new Schema({
    name: { type: String,
      trim: true,
      unique: true,
      required: [true, 'Bạn cần phải nhập tên tài khoản!!!']
    },
    password: {  
      type: String,
      trim: true,
      required: [true, 'Bạn cần phải nhập mật khẩu!!!'],
      minlength: [6,'Mật khẩu cần tối thiểu 6 ký tự!!!']    
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
    playlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "playlist"
      }]   
},
{ timestamps: true}
);

userSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
userSchema.pre('save', function(next){ 
  let user = this;
  bcrypt.hash(user.password,10,function(error, hash){
    if(error){
      return next(error);
    }else{
      user.password = hash;
      next();
    }
  })
});


 const user = mongoose.model('user', userSchema);
 module.exports = user;