import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import settingSlice from "./setting";
export default configureStore({
  reducer: {
    userSlice,
    settingSlice,
  },
});
