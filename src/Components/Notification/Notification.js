import React, { useEffect, useState } from "react";
import { notificationList,deleteNotificationData,editNotification } from "../../Services/Apis/Api";
import { useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Toolbar, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import NotificationModel from "./NotificationModel";
import AlertMssg from "../Alert/Alert";
import {Switch} from "@mui/material";

const Notification = () => {
  const dispatch = useDispatch();
  const [openDilog, setOpenDialog] = React.useState({
    open: false,
    type: "add",
  });
  const [openAlert,setOpenAlert] = React.useState({
    open:false,
    mssg:"add",
    type:"success"
  })

  const [singleNotification, setSingleNotification] = useState({})
  const [notification, setNotification] = useState([]);
  const columns = [
    {
      field: "message",
      headerName: "Notification",
      width: 400,
      editable: false,
    },
    {
      field: "isPinned",
      headerName: "Active",
      width: 150,
      renderCell:(row)=>{
  return(<Switch checked={row.row.isPinned}  onChange={(e)=>{
        let disableData = {"isPinned":e.target.checked}
        dispatch(editNotification({id:row.row._id, data:disableData})).then((res)=>{
          apicall()
         })
      
  }}/>)
      }
      
    },

    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (row) => {
        return <Action row={row} />;
      },
    },
  ];

  async function apicall() {
    try {
      const notification = await dispatch(notificationList());
      console.log(notification.payload.data, "noti");
      setNotification(notification.payload.data);
    } catch (err) {}
  }
  useEffect(() => {
    apicall();
  }, []);

 
  const Action = ({ row }) => {
    const deleteNotificationMethod = async (notification)=>{
        try{
            let success = await dispatch(deleteNotificationData(notification._id))
            if(success)
            {
                setOpenAlert({
                    open:true,
                    type:"success",
                    mssg:"succesfully delete notification"
                })
                apicall();
            }
        }
        catch(err)
        {
            setOpenAlert({
                open:true,
                type:"error",
                mssg:"something wrong"
            })
        }
     
        } 
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{ color: "darkblue", cursor: "pointer", marginLeft: "5px" }}
          onClick={()=>{
            setSingleNotification(row.row)
            setOpenDialog({type:"edit",open:true})
          }}
        >
          {" "}
          <EditIcon />
        </div>
        <div onClick={()=>deleteNotificationMethod(row.row)} style={{ color: "darkred", cursor: "pointer", marginLeft: "5px" }}>
          <DeleteIcon />
        </div>
      </div>
    );
  };
  return (
    <div>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          zIndex: "1",
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Notification
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          height: "500px",
          marginTop: "20px",
          background: "white",
          justifyContent: "center",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="flex "
          style={{ justifyContent: "left", width: "80%", marginBottom: "20px" }}
        >
          <div style={{ width: "90%" }}>
            <Button
              variant="contained"
              style={{ background: "#6750A4" }}
              onClick={() =>
                setOpenDialog({
                  open: true,
                  type: "add",
                })
              }
            >
              Add Notification
            </Button>
          </div>
        </div>
        <div
          style={{
            minWidth: "300px",
            maxWidth: "100%",
            width: "80%",
            background: "white",
          }}
        >
          <div style={{ height: 400, width: "100%", background: "white" }}>
            <DataGrid
              rows={notification}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row._id}
              
              //   onRowClick={Handle}
              rowsPerPageOptions={[5]}
   
            />
          </div>
        </div>
      </div>
      <NotificationModel action={openDilog} singleNotification={singleNotification} setAction={setOpenDialog} apicall={apicall} setOpenAlert={setOpenAlert}/>
      <AlertMssg  action={openAlert} setAction={setOpenAlert}/>
      

    </div>
  );
};

export default Notification;
