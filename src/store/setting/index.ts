import { createSlice } from "@reduxjs/toolkit";
export const settingSlice = createSlice({
  name: "setting",
  initialState: {
    menuStatus: false,
  },
  reducers: {
    setmenuStatus: (state, action) => {
      state.menuStatus = action.payload;
    },
  },
});
export const { setmenuStatus } = settingSlice.actions;

export default settingSlice.reducer;
