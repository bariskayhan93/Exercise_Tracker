const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 10
  }
  
},{ versionKey: false });

module.exports=mongoose.model("User",UserSchema)
