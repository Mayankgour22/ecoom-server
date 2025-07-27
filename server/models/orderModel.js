const mongoose= require("mongoose");
const orderSchema= new mongoose.Schema({
    amount:Number,
    products:[String], 
    clientname:String,
    city:String, 
    address:String,
    pincode:Number, 
    email:String,
    amountpaid: {
        type: Boolean,
        default: false
    },
    isdispatched: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
module.exports = mongoose.model("order", orderSchema);