import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/CartSlice";

export const store = configureStore({
  reducer: {
    cart: productReducer,
  },
});
