const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const OrderModel = require("../models/orderModel");
require("dotenv").config()
//Creating Order



router.post("/orders", async (req, res) => {
const {amount, products, name, city, address, pincode, email}= req.body;

    try {
        const Order = await OrderModel.create({
            amount: amount,
            products: products,
            clientname: name,
            city: city,
            address: address,
            pincode: pincode,
            email: email
        })


        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }
       instance.orders.create(options, (error, order) => {
    if (error) {
        console.log("Razorpay order error:", error);
        return res.status(500).json({ message: "Something Went Wrong!" });
    }
    console.log("Razorpay order created:", order); // ✅ Add this
    res.status(200).json({ data: order });
});
     
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }

});

//Verifying the payment
router.post("/verify", async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;;
        const resultSign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature == resultSign) {
            return res.status(200).json({ message: "Payment verified successfully" });
        }
        console.log(process.env.KEY_ID, process.env.KEY_SECRET);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

module.exports = router;