import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    const response = await axios.get("http://localhost:3000/products");
    return response.data
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, thunkAPI) => {
    const response = await axios.post("http://localhost:3000/add", {...product, id: +(new Date())});
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product, thunkAPI) => {
    const response = await axios.post("http://localhost:3000/update", product);
    return response.data;
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id, thunkAPI) => {
    const response = await axios.post("http://localhost:3000/remove", { id });
    return response.data;
  }
);

const initialState = { value: [] };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    removeProduct(state, action) {
      state.value.splice(action.payload, 1);
    },
    updateProduct(state, action) {
      const id = Number(window.location.pathname.split("/").pop());
      state.value[id] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export default productsSlice;
