const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({

     name:String,
     email:String,
     address:String,
     city:String,
     contact:Number,
     pincode:Number,
     password:String
});
module.exports = mongoose.model("user", UserSchema);