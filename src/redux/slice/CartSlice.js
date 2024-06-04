import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "Products",
  initialState: {
    CartArr: [],
  },
  reducers: {
    AddProduct: (state, action) => {
      const productIndex = state.CartArr.findIndex(
        (p) => p._id === action.payload._id
      );
      if (productIndex === -1) {
        state.CartArr.push({ ...action.payload, quantity: 1 });
      } else {
        state.CartArr[productIndex].quantity += 1;
      }
    },
    DeleteProduct: (state, action) => {
      const productIndexRemove = action.payload._id;
      const newCart = state.CartArr.filter(
        (item) => item._id !== productIndexRemove
      );
      return { ...state, CartArr: newCart };
    },
  },
});

export const { AddProduct, DeleteProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
