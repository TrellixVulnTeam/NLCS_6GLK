const mongoose = require('mongoose');
const moment = require('moment-timezone');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const reportSchema = new Schema({
    contentReport: {
      type: String,
      trim: true,
      required: [true, 'report must have content']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
    songs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "song"
      },
    isChecked: {type: Boolean}
},
{ timestamps: true});
reportSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const report = mongoose.model('report', reportSchema);
module.exports = report;