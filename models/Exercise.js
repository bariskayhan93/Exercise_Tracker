const mongoose = require("mongoose");

const ExcsSchema = new mongoose.Schema({
  _id: String,
  username: {
    type: String,
    require: true,
  },
  date: {
    type: String
  },
  duration: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    require: true
  }
},{ versionKey: false }
);

module.exports = mongoose.model("Exercise", ExcsSchema);
