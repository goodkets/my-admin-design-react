import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem, removeItem } from "@/utils/storeages";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      name: "",
      role: "",
    },
    token: getItem("token"),
    permission: getItem("permission"),
  },
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
      setItem("token", action.payload);
    },
    removeUserToken: (state, action) => {
      state.token = "";
      removeItem(action.payload);
      removeItem("permission");
    },
    setUserPromission: (state, action) => {
      state.permission = action.payload;
      setItem("permission", action.payload);
    },
  },
});
export const { setUserToken, removeUserToken,setUserPromission } = userSlice.actions;

export default userSlice.reducer;
