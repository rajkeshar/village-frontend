// import {customerRegistration} from './Apis/Api'
import { departmantList } from '../Apis/Api'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

const departmantListREducer = createSlice({
  name:"departmant",
  initialState,
  extraReducers:{
    [departmantList.fulfilled] : (state, action) =>{
      state.mssg = "success"
      state.payload = action.payload
      return state
    },
    [departmantList.pending] : (state, action) =>{
      state.mssg = "loading"
    },
    [departmantList.rejected] : (state,action) =>{
      state.mssg = "rejected"
    }
  }
})


export default departmantListREducer.reducer