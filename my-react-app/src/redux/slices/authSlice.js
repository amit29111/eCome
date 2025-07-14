import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: "John Doe",
      email: "johndoe@example.com",
      address: "123 Main Street",
    },
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { updateUser } = authSlice.actions;
export default authSlice.reducer;
