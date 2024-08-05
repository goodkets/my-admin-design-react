import { createSlice } from '@reduxjs/toolkit'
import {getToken,setToken,removeToken} from "@/utils/storeages"
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo:{
        name:'',
        role:''
    },
    token:getToken('token'),
  },
  reducers: {
    setUserToken:(state,action)=>{
        console.log(state,action)
        setToken(state.token,action.payload)
    },
    removeUserToken:(state,action)=>{
        removeToken(state.token)
    }
  }
})
export const { setUserToken,removeUserToken } = userSlice.actions

export default userSlice.reducer