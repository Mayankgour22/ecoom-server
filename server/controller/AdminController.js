const AdminModel = require("../models/AdminModel")
const OrderModel = require("../models/orderModel")
const multer = require("multer")
const {CloudinaryStorage} =require("multer-storage-cloudinary")
const cloudinary = require("../cloudinary");
const productModel = require("../models/productModel");
//set up cloudinary storage for multer 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Electronic_store",
    format: async (req, file) => "jpg", // supports promises as well
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});
const uploade = multer({ storage: storage }).array('image',10);

const datasava = async (req, res) => {
  uploade(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error uploading files");
    }

    // If no error, proceed with whatever you want
    const imageUrl = req.files.map(file=>file.path)
    console.log(imageUrl);
    
    const { name, description, category, brand, price } = req.body;
    const product = await productModel.create({
      name: name,
      description: description,
      category: category,
      brand: brand,
      price: price,
      images: imageUrl,
      defaultimage: imageUrl[0],
    });
    console.log("Uploaded files:", req.files);
    return res.status(200).send({
      msg: "Files uploaded successfully",
      files: req.files
    });
    
  });
  
};
const adminlogin= async(req , res)=>{
 const { email, password} =req.body
 
  try {
    const Admin = await AdminModel.findOne({adminid:email})
    if(!Admin){
        res.status(401).send({msg:"Invalid email!!!!"})
    }
    if(Admin.Password!= password){
        res.status(401).send({ msg: "Invalid Password!!!!" });
    }
     res.status(200).send( {msg:"Login Success!!!", Admin:Admin})
  } catch (error) {
    console.log(error)
  }
}
const orderdetailes=async(req,res)=>{
  const Orders= await OrderModel.find();
  res.status(200).send(Orders);
}
const dispatchorder=async(req,res)=>{
 const  {id} =req.query;
 const Order = await OrderModel.findByIdAndUpdate(id , {
   isdispatched:true
 })   
  res.send({msg:"order dispatched"})

}



module.exports = {
  adminlogin,
  datasava,
  orderdetailes,
  dispatchorder
};