const mongoose = require("mongoose");

const ExcsSchema = new mongoose.Schema({
  taskId: {
    type: String
  },
  desc: {
    type: String,
    require: true,
  },
  dur: {
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
