const express = require("express")
const route = express.Router()
const AdminController = require("../controller/AdminController")
route.post("/adminlogin" , AdminController.adminlogin )
route.post("/datasava", AdminController.datasava);
route.get("/orderdetailes" , AdminController.orderdetailes)
route.get("/dispatchorder" , AdminController.dispatchorder)
module.exports = route;
