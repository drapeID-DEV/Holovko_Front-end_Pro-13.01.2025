import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserLogin = createAsyncThunk(
  "login/loginUser",
  async (user, thunkAPI) => {
    const response = await axios.post("http://localhost:3000/login", user);
    return response.data;
  }
);

const initialState = { currentUser: null };

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const { addContact, removeContact, updateContact } = loginSlice.actions;
export default loginSlice;
