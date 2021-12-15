const mongoose = require("mongoose");

const ExcsSchema = new mongoose.Schema({
  _id: String,
  description: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
    min: 0,
    max: 100,
  },
  date: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  }
},{ versionKey: false }
);

module.exports = mongoose.model("Exercise", ExcsSchema);
