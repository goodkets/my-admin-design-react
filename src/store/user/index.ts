import { createSlice } from "@reduxjs/toolkit";
import { getToken, setToken, removeToken } from "@/utils/storeages";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      name: "",
      role: "",
    },
    token: getToken("token"),
  },
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
      setToken("token", action.payload);
    },
    removeUserToken: (state, action) => {
      console.log(123, action);
      state.token = "";
      removeToken(action.payload);
    },
  },
});
export const { setUserToken, removeUserToken } = userSlice.actions;

export default userSlice.reducer;
