const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
  adminid: String,
  Password: String,
  name: String
  
});
module.exports = mongoose.model("Admin", AdminSchema);
