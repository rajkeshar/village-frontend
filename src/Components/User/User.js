import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Switch,Chip } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { userList,deleteDepartmant,deleteUser } from "../../Services/Apis/Api";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import Model from "./Departmant/Model";
import AlertMssg from "../Alert/Alert";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
// import DistrictModel from "./DistrictModel";
import { useParams } from "react-router-dom";
import UserModel from "./UserModel";

export default function User() {
  const Handle = () => {
    "Hello";
  };
  const {zoneId,blockUniqueId} = useParams()
  const dispatch = useDispatch()
  const [users,setUsers] = React.useState([])
  const [index, setIndex] = React.useState(0)
  
  const [openDilog,setOpenDialog] = React.useState({
    open:false,
    type:"add",
    for:""
  })
  const [openAlert,setOpenAlert] = React.useState({
    open:false,
    mssg:"add",
    type:"success"
  })
  const [singleDistrict,setSingleDistrict] = React.useState({})
  const navigate = useNavigate()
 

  const getDistrict = ()=>{
    dispatch(userList({zoneId,blockUniqueId})).then((res)=>{
        console.log(res.payload.data)
        setUsers(res.payload.data)
    })
  }
  React.useEffect(() => {
    getDistrict()
  }, [])
const editDepartmant = (singleDepartmant)=>{
  setOpenDialog({...openDilog,open:true,type:"edit",for:"user"})
  console.log(singleDepartmant,"kkk")
  setSingleDistrict(singleDepartmant)
}
 function deleteSingleDepartmant (singleDepartmant){
  const response =  dispatch(deleteUser(singleDepartmant._id)).then((res)=>{
    console.log(res)
    setOpenAlert({open:true,mssg:"user delete successfully",type:"success"})
    getDistrict()
  }). catch((err)=>{
    setOpenAlert({open:true,mssg:"error",type:"error"})
  })
}

function assignVillege(village,index)
{
  console.log(village,"village2")
  setSingleDistrict(village.row)
  setOpenDialog({...openDilog,open:true,type:"add",for:"Village"})
}
const assignDep = (dep) =>
{
  console.log(dep,"dep")
  setSingleDistrict(dep)
  setOpenDialog({...openDilog,open:true,type:"add",for:"Departmant"})
}
  const Action = ({row})=>{
    return(
      <div style={{display:"flex"}}>
           <div  style={{color:"darkblue",cursor:"pointer",marginLeft:"5px"}} onClick={()=>editDepartmant(row.row)}><EditIcon/></div>
          <div style={{color:"darkred",cursor:"pointer",marginLeft:"5px"}} onClick={()=>deleteSingleDepartmant(row.row)}><DeleteIcon/></div>
         {/* <div style={{color:"green",cursor:"pointer",marginLeft:"5px"}} onClick={()=>navigate(`/dashboard/department/${row.row._id}/${row.row.deptName}`)}><VisibilityIcon/></div>*/}
          
      </div>
    )
  }
  const columns = [
    // { field: "villageUniqueId", headerName: "Village ID", width: 250 },
    {
      field: "fullname",
      headerName: "Full Name",
      width: 150
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
    {
      field: "village",
      headerName: "Villege",
      width: 150,
      editable: false,
      renderCell:(row,index)=>{
        return(<Button onClick={()=>assignVillege(row)}>Assign Village</Button>)
    },
    },
    {
      field: "departmant",
      headerName: "Departmant",
      width: 200,
      editable: false,
      renderCell:(row)=>{
        return(<Button onClick={()=>assignDep(row.row)}>Assign Departmant</Button>)
    },
    }
    ,
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      renderCell:(row)=>{
          return(<Action row={row}/>)
      },
    }
  ];
  

  return (
    <div>
    <AppBar
    position="absolute"
    color="default"
    elevation={0}
    sx={{
      zIndex:"1",
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
      
    <div className="flex " style={{justifyContent:"left",width:"80%",marginBottom:"20px"}}><div style={{width:"90%"}}><Button  variant="contained" style={{background: "#6750A4"}} onClick={()=>setOpenDialog({...openDilog,open:true,type:"add",for:"user"})}>Add User</Button></div></div>
    <div style={{minWidth:"300px",maxWidth:"100%",width:"80%",background:"white"}}>
          
          <div style={{ height: 400, width: "100%", background: "white" }}>
           <DataGrid
              rows={users}
              columns={columns}
              pageSize={5}
              getRowId={(row) =>  row._id}
              onRowClick={Handle}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
  />
          </div>
      </div>
    </div>
        {/*<Model action={openDilog} getDistrict={getDistrict} setOpenAlert={setOpenAlert} singleDistrict={singleDistrict} dispatch={dispatch} setAction={setOpenDialog}/>*/}
        <UserModel  action={openDilog} getDistrict={getDistrict} setOpenAlert={setOpenAlert} singleDistrict={singleDistrict} dispatch={dispatch} setAction={setOpenDialog}/>
        <AlertMssg  action={openAlert} setAction={setOpenAlert}/>
    </div>
  );
}
