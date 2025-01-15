import { createSlice } from "@reduxjs/toolkit";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    skills: [],
  },
  reducers: {
    setSkills(state, action) {
      state.skills = action.payload;
    },
    removeSkill(state, action) {
      state.skills = state.skills.filter((skill) => skill._id !== action.payload);
    },
  },
});

export const { setSkills, removeSkill } = skillSlice.actions;
export default skillSlice.reducer;