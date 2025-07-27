const express = require("express")
const route = express.Router()
const UserController = require("../controller/UserController")
route.get("/datadisplay", UserController.datadisplay);
route.post("/registerUser", UserController.registerUser);
route.post("/loginuser", UserController.loginuser);
route.post("/authuser", UserController.authuser);
route.get("/userinfo", UserController.userinfo);
route.get("/displayproduct" , UserController.displayproduct)
route.get("/searchproduct", UserController.searchproduct)
module.exports = route;