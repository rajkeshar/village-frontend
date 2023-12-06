import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AppBar, Button, Dialog, DialogActions, DialogContent, Toolbar, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { userList,deleteUser,surveyList } from "../../Services/Apis/Api";
import UserVillageModel from "./UserVillageModel";
import UserDepartmantModel from "./UserDepartmantModel";
import EditModel from "./EditModel";
import AlertMssg from "../Alert/Alert";
import CombinationModel from "./combinationModel/CombinationModel";

const User2 = () => {
  const [users, setUsers] = useState([]);
  const [dialogOpenForVillage, setDialogOpenForVillage] = useState(false)
  const [deleteDrawer, setDeleteDrawer] = useState(false)
  const [deleteUserData, setDeleteUserData] = useState({})

  const [dialogOpenForDepartmant, setDialogOpenForDepartmant] = useState(false)
  var userData = JSON.parse(localStorage.getItem("User"))
  const [openDilog,setOpenDialog] = React.useState({
    open:false,
    type:"add",
  })

  const [openAlert,setOpenAlert] = React.useState({
    open:false,
    mssg:"add",
    type:"success"
  })

  const [singleUser, setSingleUser] = useState({})
  const[editableData,seEditableData] = React.useState(false)
  const [openCombinationDilog,setOpenCombinationDialog] = React.useState(false)
  const dispatch = useDispatch();

  //useeffect

  useEffect(() => {
    apiCall();
  }, []);

  // function

  function apiCall() {
    dispatch(userList()).then((res) => {
      console.log(res.payload.data);
      setUsers(res.payload.data);
    });

    dispatch(surveyList()).then((res)=>{
      console.log(res.payload.data)

      res.payload.data.map((isAvailable)=>{
        console.log(isAvailable,"<Action")
        if(isAvailable.IsOnGoingSurvey == "OnGoing")
        {
             seEditableData(true)
        }
      })
      // seEditableData(res.payload.data.flter((is)=>is.IsOnGoingSurvey == "OnGoing").length == 0)
  })
  }

  function deleteSingleUser(id)
  {
    dispatch(deleteUser(id._id)).then((res)=>{
        console.log(res)
        setOpenAlert({open:true,mssg:"user delete successfully",type:"success"})
        apiCall()
        setDeleteDrawer(false)
      }). catch((err)=>{
        setOpenAlert({open:true,mssg:"error",type:"error"})
        setDeleteDrawer(false)
      })
  }

  // normal component

  const Action = ({ row }) => {

    return (
      <div style={{ display: "flex" }}>
      {userData.role == "DistrictManager"?"":userData.role == "admin"?"":<div
          style={{ color: "darkblue", cursor: "pointer", marginLeft: "5px" }}
          onClick={()=>{
            console.log(row)

            setSingleUser(row.row)
            setOpenDialog({type:"edit",open:true})
          }}
        >
          <EditIcon />
        </div>}
       {userData.role == "DistrictManager"?"":userData.role == "admin"?"": <div style={{ color: "darkred", cursor: "pointer", marginLeft: "5px" }} onClick={()=>{
        setDeleteDrawer(true)
        setDeleteUserData(row.row)
       }}>
          <DeleteIcon />
        </div>}
        {/* <div style={{color:"green",cursor:"pointer",marginLeft:"5px"}} onClick={()=>navigate(`/dashboard/department/${row.row._id}/${row.row.deptName}`)}><VisibilityIcon/></div>*/}
      </div>
    );
  };

  const columns = userData.role == "DistrictManager"?[{
    field: "fullname",
    headerName: "Full Name",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: false,
  },
  {
    field: "contactNumber",
    headerName: "Contact Number",
    width: 150,
    editable: false,
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
    editable: false,
  }]:[
    // { field: "villageUniqueId", headerName: "Village ID", width: 250 },
    {
      field: "fullname",
      headerName: "Full Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: false,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      width: 150,
      editable: false,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      editable: false,
    },
    // {
    //   field: "village",
    //   headerName: "Villege",
    //   width: 150,
    //   editable: false,
    //   renderCell: (row, index) => {
    //     return <div>{editableData?"-----":userData.role != "admin"?<Button onClick={()=>
            
    //       {
    //           setSingleUser(row.row)

    //           setDialogOpenForVillage(true)
          
    //   }}>Assign Village</Button>:<Button disabled>Assign Village</Button>}</div>;
    //   },
    // },
    // {
    //   field: "departmant",
    //   headerName: "Departmant",
    //   width: 200,
    //   editable: false,
    //   renderCell: (row) => {
    //     return <div>{editableData?"survey is running":userData.role != "admin"?<Button onClick={()=>
            
    //         {
    //             setDialogOpenForDepartmant(true)
    //             setSingleUser(row.row)
            
    //     }}>Assign Departmant</Button>:<Button disabled>Assign Departmant</Button>}</div>
    //   },
    // },
    {
      field: "AssignDepartmentAndVillage",
      headerName: "AssignDepartmentAndVillage",
      width: 300,
      editable: false,
      renderCell: (row, index) => {
        return <div>{!editableData?<Button onClick={()=>
          {
            console.log(openCombinationDilog)
            setSingleUser(row.row)
            setOpenCombinationDialog(true)
        }}>AssignDepartmentAndVillage</Button>:"survey is running"}</div>;
      },
    },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      renderCell: (row) => {
        return <div>{editableData?"-----":<Action row={row} />}</div>;
      },
    },
  ];

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
            User
          </Typography>
        </Toolbar>
      </AppBar>

    <div style={{display:"flex", height:"500px",marginTop:"20px",background:"white",justifyContent:"center",width:"100%",flexDirection:"column",alignItems:"center"}}>
    {!editableData?userData.role == "DistrictManager"?"":userData.role == "admin"?"": <div className="flex " style={{justifyContent:"left",width:"80%",marginBottom:"20px"}}><div style={{width:"90%"}}><Button  variant="contained" style={{background: "#6750A4"}} onClick={()=>setOpenDialog({open:true,type:"add"})}>Add User</Button></div></div>:""}

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
            rows={users}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[5]}
        
          />
          </div>
        </div>
      </div>

      <UserVillageModel dialogOpenForVillage={dialogOpenForVillage} setDialogOpenForVillage={setDialogOpenForVillage} singleUser={singleUser}/>
      <UserDepartmantModel  singleUser={singleUser} setDialogOpenForDepartmant={setDialogOpenForDepartmant} dialogOpenForDepartmant={dialogOpenForDepartmant}/>
      <EditModel apiCall={apiCall} openDilog={openDilog} setOpenDialog={setOpenDialog} singleUser={singleUser}   openAlert={openAlert} setOpenAlert={setOpenAlert}/>
     
      <CombinationModel singleUser={singleUser}  dialogOpenForDepartmant setDialogOpenForDepartmant openAlert={openAlert} setOpenAlert={setOpenAlert} openCombinationDialog={openCombinationDilog} setOpenCombinationDialog={setOpenCombinationDialog}/>
      
      <AlertMssg  action={openAlert} setAction={setOpenAlert}/>

      <Dialog  open={deleteDrawer} onClose={()=>setDeleteDrawer(false)}>
      <DialogContent>
          Are you sure you want to delete it
      
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{
          deleteSingleUser(deleteUserData)
        }}>Delete</Button>
      </DialogActions>
      
   </Dialog>
    </div>
  );
};

export default User2;
