import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNotificationMessage, editNotification } from '../../Services/Apis/Api'
import { useEffect } from 'react'

const NotificationModel = ({action,setAction,singleNotification,setOpenAlert,apicall}) => {
    const dispatch = useDispatch()
    const [message,setMessage] = useState("")
    console.log(singleNotification.message)

    useEffect(()=>{

        action.type == "add"?setMessage(""):setMessage(singleNotification.message)

    },[singleNotification,action])
   async function addNotificationData()
    {
        try{
            if(message)
            {
          let addNotification = await dispatch(addNotificationMessage({message:message}))
           console.log(addNotification) 
           setOpenAlert({
            open:true,
            mssg:action.type=="edit"?"Notification edit successfully":"Notification add successfully",
            type:"success"
        })
        apicall()
        setAction({...action,open:false})
    }
    else{
        setOpenAlert({
            open:true,
            mssg:"Mssg is Required",
            type:"error"
        })
    }

        }
        catch(err)
        {
            console.log(err)
            setOpenAlert({
                open:true,
                mssg:"something is wrong",
                type:"error"
            })
        }
    }

    async function editNotifications()
    {
        
        try{
            let data = {message:message}
            let id = singleNotification._id
            let edit = await dispatch(editNotification({data,id}))
             console.log(edit) 
             setOpenAlert({
              open:true,
              mssg:action.type=="edit"?"Notification edit successfully":"Notification add successfully",
              type:"success"
          })
          apicall()
          setAction({...action,open:false})
  
          }
          catch(err)
          {
              console.log(err)
              setOpenAlert({
                  open:true,
                  mssg:"something is wrong",
                  type:"error"
              })
          }

    }
  return (
    <div>
    <Dialog open={action.open} style={{height:"100%"}} onClose={()=>setAction({...action,open:false})}>
    <DialogTitle>      
         {action.type == "add"? "Add Notification":"Edit Notification"}
    </DialogTitle>
    <DialogContent>
        
        <TextField type="text" label="message" value={message} onChange={(e)=>setMessage(e.target.value)} style={{marginTop:"20px"}}/>
    
    </DialogContent>

    <DialogActions>
    <Button onClick={()=>setAction({...action,open:false})}>Cancel</Button>
     {action.type == "add"? <Button onClick={()=>addNotificationData()}>Add</Button>:<Button onClick={()=>editNotifications()}>Edit</Button>}
  </DialogActions>
    </Dialog>
    </div>
  )
}

export default NotificationModel
