// import {customerRegistration} from './Apis/Api'
import { zoneList } from '../../Apis/Api'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

const zoneReducer = createSlice({
  name:"zone",
  initialState,
  extraReducers:{
    [zoneList.fulfilled] : (state, action) =>{
      state.mssg = "success"
      state.payload = action.payload
      return state
    },
    [zoneList.pending] : (state, action) =>{
      state.mssg = "loading"
    },
    [zoneList.rejected] : (state,action) =>{
      state.mssg = "rejected"
    }
  }
})


export default zoneReducer.reducer