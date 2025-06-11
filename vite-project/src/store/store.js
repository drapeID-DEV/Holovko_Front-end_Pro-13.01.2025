import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import productsSlice from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    products: productsSlice.reducer,
  }
});
