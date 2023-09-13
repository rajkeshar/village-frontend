// import {customerRegistration} from './Apis/Api'
import { schemeList } from '../../Apis/Api'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

const departmantListREducer = createSlice({
  name:"scheme",
  initialState,
  extraReducers:{
    [schemeList.fulfilled] : (state, action) =>{
      state.mssg = "success"
      state.payload = action.payload
      return state
    },
    [schemeList.pending] : (state, action) =>{
      state.mssg = "loading"
    },
    [schemeList.rejected] : (state,action) =>{
      state.mssg = "rejected"
    }
  }
})


export default departmantListREducer.reducer