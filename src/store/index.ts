import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
export default configureStore({
  reducer: {
    userSlice,
  },
});
