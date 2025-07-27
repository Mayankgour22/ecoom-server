const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  brand: String,
  price: Number,
  images:[String],
  defaultimage:String
});
module.exports = mongoose.model("Product", ProductSchema);
