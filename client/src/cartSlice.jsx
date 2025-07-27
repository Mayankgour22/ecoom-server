import { createSlice } from "@reduxjs/toolkit";
import { toast , ToastContainer} from "react-toastify";
const cartSlice = createSlice({
  name: "mycart",
  initialState: {
    cart: [],
  },
  reducers: {
    addtoCart: (state, actions) => {
      const data = state.cart.filter((key) => key.id == actions.payload.id);
      if (data.length >= 1) {
        alert("Product aleready added!");
      } else {
        state.cart.push(actions.payload);
        console.log(actions.payload);
      }
    },

    dataIncrease: (state, actions) => {
      for (var i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id == actions.payload.id) {
          state.cart[i].qnty++;
        }
      }
    },
    dataDecrease: (state, actions) => {
      for (var i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id == actions.payload.id) {
          if (state.cart[i].qnty <= 1) {
            alert("item cannot be less than one")
          } else {
            state.cart[i].qnty--;
          }
        }
      }
    },
    removeItem: (state , actions)=>{
      state.cart = state.cart.filter((item) => item.id != actions.payload.id);
    }
  },
});

export const { addtoCart, dataIncrease, dataDecrease, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
