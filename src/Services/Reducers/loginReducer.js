// import {customerRegistration} from './Apis/Api'
import { loginUser } from '../Apis/Api'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

const loginReducer = createSlice({
  name:"customer",
  initialState,
  extraReducers:{
    [loginUser.fulfilled] : (state, action) =>{
      state.mssg = "success"
      state.payload = action.payload
      return state
    },
    [loginUser.pending] : (state, action) =>{
      state.mssg = "loading"
    },
    [loginUser.rejected] : (state,action) =>{
      state.mssg = "rejected"
    }
  }
})


export default loginReducer.reducer