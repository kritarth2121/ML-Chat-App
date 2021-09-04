import { createSlice } from "@reduxjs/toolkit";

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    premium:null
    // questionId: null,
    // questionName: null,
  },
  reducers: {
    setQuestionInfo: (state, action) => {
      state.premium= action.payload;
      // state.questionId = action.payload.questionId;
      // state.questionName = action.payload.questionName;
    },
    
  },
});

export const { setQuestionInfo } = questionSlice.actions;

export const getPremium = (state:any) => state.premium;
// export const selectQuestionName = (state:any) => state.question.questionName;

export default questionSlice.reducer;
