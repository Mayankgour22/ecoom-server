import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { dataIncrease, dataDecrease, removeItem } from "./cartSlice";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-bootstrap";

const CartData = () => {
  const cartData = useSelector((state) => state.mycart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let totalPrice = 0;

  return (
    <div className="itemcart container my-5">
      <h1 className="text-center mb-4">🛒 Your Cart</h1>
      <Table responsive className="cart-table table-bordered text-center">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Product</th>
            <th>Description</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartData.map((item, index) => {
            const itemTotal = item.price * item.qnty;
            totalPrice += itemTotal;

            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.defaultimage}
                    alt={item.name}
                    width="80"
                    height="80"
                    className="img-thumbnail"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.brand}</td>
                <td>₹{item.price}</td>
                <td>
                  <FaPlusCircle
                    className="action-icon text-success"
                    onClick={() => dispatch(dataIncrease({ id: item.id }))}
                  />
                  <span className="mx-2">{item.qnty}</span>
                  <FaMinusCircle
                    className="action-icon text-danger"
                    onClick={() => dispatch(dataDecrease({ id: item.id }))}
                  />
                </td>
                <td>₹{itemTotal}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => dispatch(removeItem({ id: item.id }))}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="cart-summary text-end mt-4">
        <h4 className="text-primary">
          Total Price: <FaIndianRupeeSign /> {totalPrice}
        </h4>
        <Button
          variant="primary"
          size="lg"
          className="mt-3"
          onClick={() => {
            navigate("/checkout");
          }}
        >
          Proceed to Checkout
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CartData;
