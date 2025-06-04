import { createSlice } from "@reduxjs/toolkit";

const initialState = { contacts: [] };

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    removeContact(state, action) {
      state.contacts.splice(action.payload, 1);
    },
    updateContact(state, action) {
      const id = Number(window.location.pathname.split("/").pop());
      state.contacts[id] = action.payload;
    },
  },
});

export const { addContact, removeContact, updateContact } =
  contactSlice.actions;
export default contactSlice;
