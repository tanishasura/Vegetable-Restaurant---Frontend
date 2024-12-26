import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: "",
    firstName: "",
    image: "",
    lastName: "",
    _id: "",
  };

const userSlice = createSlice({
  name: 'user',
//   initialState: {
//     currentUser: null,
//     firstName: "",
//   },
initialState,
  reducers: {
    login: (state, action) => {
      state.firstName = action.payload.user.firstName;
      state.lastName = action.payload.user.lastName;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
      state._id = action.payload.user._id;
    //   console.log("action:", action.payload.user);
    },
    logout: (state) => {
        state.firstName = "";
        state.lastName = "";
        state.email = "";
        state.image = "";
        state._id = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
