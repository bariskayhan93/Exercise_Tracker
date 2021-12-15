const mongoose = require("mongoose");

const ExcsSchema = new mongoose.Schema({
  _id: String,
  username: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
    min: 0,
    max: 100,
  },
  description: {
    type: String,
    require: true,
  }
},{ versionKey: false }
);

module.exports = mongoose.model("Exercise", ExcsSchema);
