import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    premium:false
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.premium=false;
    },
    setPremiumInfo: (state, action) => {
      state.premium= action.payload;
      // state.questionId = action.payload.questionId;
      // state.questionName = action.payload.questionName;
    },
  },
});

export const { login, logout ,setPremiumInfo} = userSlice.actions;
export const getPremium = (state:any) => state.user.premium;

export const selectUser = (state:any) => state.user.user;
//export const selectUse = (state:any) => state.user;

export default userSlice.reducer;
