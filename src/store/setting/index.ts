import { createSlice } from "@reduxjs/toolkit";
export const settingSlice = createSlice({
  name: "setting",
  initialState: {
    menuStatus: false,
    changeLoadng: false,
  },
  reducers: {
    setmenuStatus: (state, action) => {
      state.menuStatus = action.payload;
    },
    setchangeLoadng: (state, action) => {
      state.changeLoadng = action.payload;
      // console.log(state.changeLoadng)
    },
  },
});
export const { setmenuStatus, setchangeLoadng } = settingSlice.actions;

export default settingSlice.reducer;
