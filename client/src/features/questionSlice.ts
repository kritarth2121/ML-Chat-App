import { createSlice } from "@reduxjs/toolkit";

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    questionId: null,
    questionName: null,
  },
  reducers: {
    setQuestionInfo: (state, action) => {
      state.questionId = action.payload.questionId;
      state.questionName = action.payload.questionName;
    },
    
  },
});

export const { setQuestionInfo } = questionSlice.actions;

export const selectQuestionId = (state:any) => state.question.questionId;
export const selectQuestionName = (state:any) => state.question.questionName;

export default questionSlice.reducer;
