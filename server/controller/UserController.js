const ProductModel = require("../models/productModel")
const UserModel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const datadisplay=async(req , res)=>{
  try {
    const Product = await ProductModel.find();
    res.status(200).send(Product);
  } catch (error) {
    console.log(error)
  }
}
const registerUser=async(req,res)=>{
  const {name,email,address,pincode,contact, city,password,confirm} = req.body;
   try {
    const salt = bcrypt.genSaltSync(10); // generate salt with 10 rounds
    const hassedpassword = bcrypt.hashSync(password, salt);
    console.log(hassedpassword);
    const User = await UserModel.create({
      name:  name,
      email: email,
      contact:contact,
      city:city,
      address: address,
      pincode: pincode,
      password: hassedpassword,
    });
    res.status(200).send({msg:"user created sussfully"})
   } catch (error) {
    console.log(error);
    
   }
}
const loginuser=async(req , res)=>{
  const { email, password} = req.body;
  const User = await UserModel.findOne({email:email})
  if(!User){
    res.status(401).send({msg:"invalid email"})
  }
  const isMatch = await bcrypt.compare(password, User.password);
  if(!isMatch){
    res.status(401).send({ msg: "invalid password" });
  }
   const Token = jwt.sign({ id: User._id }, process.env.JWTSECRET, {
     expiresIn: "7 Days",
   });
   res.send({ Token: Token , msg:"login success"});
}
const authuser=async(req, res)=>{
  const token = req.header("auth-token");
  const decoded = await jwt.verify(token, process.env.JWTSECRET);
  console.log(decoded);
  const User = await UserModel.findById(decoded.id).select("-password");
  console.log(User);
  res.status(200).send(User);
}
const userinfo=async(req,res)=>{
  const User = await UserModel.findById(req.query.userid).select("-password")
  console.log(User)
  res.status(200).send(User);
}
const displayproduct=async(req , res)=>{
    const {id} = req.query
    const Product = await ProductModel.findById(id)
    res.send(Product)

}
const searchproduct=async(req,res)=>{
    const { search} =req.query;
    const Product = await ProductModel.find({name: { $regex: search, $options: "i" }}) 
    console.log(Product)
    res.send(Product)
}
module.exports = {
  datadisplay,
  registerUser,
  loginuser,
  authuser,
  userinfo,
  displayproduct,
  searchproduct
};