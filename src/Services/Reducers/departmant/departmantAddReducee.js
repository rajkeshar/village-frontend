// import {customerRegistration} from './Apis/Api'
import { addDepartment } from '../../Apis/Api'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

const addDepartmantReducer = createSlice({
  name:"departmentAdd",
  initialState,
  extraReducers:{
    [addDepartment.fulfilled] : (state, action) =>{
      state.mssg = "success"
      state.payload = action.payload
      return state
    },
    [addDepartment.pending] : (state, action) =>{
      state.mssg = "loading"
    },
    [addDepartment.rejected] : (state,action) =>{
      state.mssg = "rejected"
    }
  }
})


export default addDepartmantReducer.reducer