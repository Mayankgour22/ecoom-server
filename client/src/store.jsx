import { configureStore } from "@reduxjs/toolkit";
import myReducer from "./cartSlice";
const Store = configureStore({
  reducer: {
    mycart: myReducer,
  },
});

export default Store;
