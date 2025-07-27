const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drappfevl",
  api_key: "541114846747227",
  api_secret: "3yMQI_uTUa8TY2nB43OmkCoFPgw",
});

module.exports = cloudinary;