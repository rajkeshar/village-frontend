import { Edit } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import EditModel from './EditModel'

const UserProfile = () => {
    const [userData,setUserData] = useState(JSON.parse(localStorage.getItem("User")))
  const [openDilog,setOpenDialog] = React.useState({
    open:false,
    type:"edit",
  })
  const [openAlert,setOpenAlert] = React.useState({
    open:false,
    mssg:"edit",
    type:"success"
  })
  const apiCall = (data)=>{
      localStorage.setItem("User",JSON.stringify(data))
      setUserData(data)
  }
  return (
    <section className="pt-16 bg-blueGray-50">
    <div className="w-full lg:w-4/12 px-4 mx-auto">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
    
          <div className="text-center mt-12 uppercase">
            <h3  style={{display:"flex"}} className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 w-100 text-left">
              {userData.fullname}  <div style={{textAlign:"right", width:"50%",cursor:"pointer"}} onClick={()=>setOpenDialog({...openDilog,open:true})}><Edit/></div>
            </h3>
     
            <div className='text-left '>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
              User Status - {userData.userStatus}
            </div>
            <div className="mb-2 text-blueGray-600 ">
            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
            ContactNumber - {userData.contactNumber}
          </div>
          <div className="mb-2 text-blueGray-600 ">
          <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
          Email - {userData.email}
        </div>
        <div className="mb-2 text-blueGray-600 ">
        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
        Is Inspector - {userData.isInspector?"yes":"no"}
      </div>
      </div>
           
          </div>
        
        </div>
      </div>
      <EditModel apiCall={apiCall} openDilog={openDilog} setOpenDialog={setOpenDialog} singleUser={userData}   openAlert={openAlert} setOpenAlert={setOpenAlert}/>
   
    </div>
    </section>
  )
}

export default UserProfile
