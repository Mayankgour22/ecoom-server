import axios from "axios";
import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import url from "../url/backendUrl";
import { useSelector } from "react-redux";
const Checkout=()=>{
    const navigate = useNavigate();
    const [userinfo , setUserinfo ] = useState({});
    const cartData = useSelector((state) => state.mycart.cart);
    let totalPrice = 0;
    const [scheduleDelivery, setScheduleDelivery] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cod");

    const handleToggle = () => setScheduleDelivery(!scheduleDelivery);
    const handlePaymentChange = (e) => setPaymentMethod(e.target.value);
    const lodedata=async()=>{
        let api=`${url}/user/userinfo/?userid=${localStorage.getItem("userid")}`;
         try {
            const response= await axios.get(api);
            console.log(response.data)
            setUserinfo(response.data)
         } catch (error) {
            console.log(error)
         }
    }
    let productName =[];
    let defaultimage='';
    {cartData.map((item, index) => {
        const itemTotal = item.price * item.qnty;
        productName.push(item.name)
        defaultimage += item.defaultimage;
        totalPrice += itemTotal;})}
    useEffect(()=>{
      if(!localStorage.getItem("username")){
        navigate("/login")

      }
      lodedata()
    },[])

    const initPay = (data) => {
      const options = {
        key: "rzp_test_r7gLXbkT6ycBgz",
        amount: totalPrice,
        currency: data.currency,
        name: productName,
        description: "Test",
        image: defaultimage,
        order_id: data.id,
        handler: async (response) => {
          const body = {
            razorpay_order_id: data.id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          };
  await axios.post("http://localhost:6005/api/payment/verify", response);
},
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    };
    const handlePay = async () => {
      try {
        const orderURL = "http://localhost:6005/api/payment/orders";
        const { data } = await axios.post(orderURL, {
          amount: totalPrice ,
          products: productName,
          name: userinfo.name,
          city: userinfo.city,
          address: userinfo.address,
          pincode: userinfo.pincode,
          email: userinfo.email,
        });
        console.log(data);
        initPay(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    return (
      <div className="checkout-container">
        <div className="delivery-info">
          <h2>Delivery Information</h2>
          <form>
            <div className="form-row">
              <input
                type="text"
                placeholder="Name"
                value={userinfo.name}
                readOnly
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={userinfo.contact}
              />
            </div>
            <div className="form-row">
              <input type="email" placeholder="Email" value={userinfo.email} />
              <input type="text" placeholder="City" value={userinfo.city} />
            </div>
            <div className="form-row">
              <input type="text" placeholder="alternate address" />
              <select>
                <option value="CA">CA</option>
                <option value="NY">NY</option>
                <option value="TX">TX</option>
              </select>
            </div>
            <input type="text" placeholder="Address" className="full-width" />
          </form>

          <div className="schedule-delivery">
            <label>
              Schedule Delivery:
              <input
                type="checkbox"
                checked={scheduleDelivery}
                onChange={handleToggle}
              />
            </label>
            {scheduleDelivery && (
              <div className="form-row">
                <input type="date" />
                <input type="text" placeholder="Note" />
              </div>
            )}
          </div>

          <div className="payment-method">
            <label>
              <input
                type="radio"
                value="online"
                name="payment"
                onChange={handlePaymentChange}
              />{" "}
              Online Payment
            </label>
            <label>
              <input
                type="radio"
                value="cod"
                name="payment"
                checked={paymentMethod === "cod"}
                onChange={handlePaymentChange}
              />{" "}
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                value="pos"
                name="payment"
                onChange={handlePaymentChange}
              />{" "}
              POS on Delivery
            </label>
          </div>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-item">
            <span>{productName[0]}</span>
            <span>$230.49 × 1</span>
          </div>
          <div className="order-item">
            <span>{productName[1]}</span>
            <span>$630.20 × 2</span>
          </div>
          <div className="order-item">
            <span>{productName[3]}</span>
            <span>$330.00 × 1</span>
          </div>

          <div className="order-total">
            <p>
              Subtotal: <strong>{totalPrice}</strong>
            </p>
            <p>
              Total: <strong>{totalPrice}</strong>
            </p>
          </div>

          <button className="confirm-btn" onClick={handlePay}>Confirm Order</button>
        </div>
      </div>
    );
}
export default Checkout;