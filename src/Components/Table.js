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
import { departmantList2,deleteDepartmant,disableDepartmant } from "../Services/Apis/Api";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Model from "./Departmant/Model";
import AlertMssg from "./Alert/Alert";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";


export default function Table() {
  const Handle = () => {
    "Hello";
  };
  const dispatch = useDispatch()
  const [departmants,setDepartmants] = React.useState([])
  const [openDilog,setOpenDialog] = React.useState({
    open:false,
    type:"add"
  })
  var userData = JSON.parse(localStorage.getItem("User"))
  
  const [openAlert,setOpenAlert] = React.useState({
    open:false,
    mssg:"add",
    type:"success"
  })
  const [singleDepartmantInformation,setSingleDepartmantInformation] = React.useState({})
  const navigate = useNavigate()
 

  const getDepartmentList = ()=>{
    dispatch(departmantList2()).then((res)=>{
      setDepartmants(res.payload.data)
    })
  }
  React.useEffect(() => {
    getDepartmentList()
  }, [])
const editDepartmant = (singleDepartmant)=>{
  setOpenDialog({...openDilog,open:true,type:"edit"})
  setSingleDepartmantInformation(singleDepartmant)
}
 function deleteSingleDepartmant (singleDepartmant){
  const response =  dispatch(deleteDepartmant(singleDepartmant._id)).then((res)=>{
    console.log(res)
    setOpenAlert({open:true,mssg:"departmant delete successfully",type:"success"})
    getDepartmentList()
  }). catch((err)=>{
    setOpenAlert({open:true,mssg:"error",type:"error"})
  })
}
  const Action = ({row})=>{
    return(
      <div style={{display:"flex"}}>
           <div style={{color:"darkblue",cursor:"pointer",marginLeft:"5px"}} onClick={()=>editDepartmant(row.row)}><EditIcon/></div>
           {userData.role == "DistrictManager"?"":<div style={{color:"darkred",cursor:"pointer",marginLeft:"5px"}} onClick={()=>deleteSingleDepartmant(row.row)}><DeleteIcon/></div>}
          <div style={{color:"darkgreen",cursor:"pointer",marginLeft:"5px"}} onClick={()=>navigate(`/dashboard/department/${row.row._id}/${row.row.deptName}`)}><VisibilityIcon/></div>
          
      </div>
    )
  }
  const columns = [
    // { field: "_id", headerName: "ID", width: 250 },
    {
      field: "deptName",
      headerName: "Departmant Name",
      width: 150,
      editable: false,
    },
    {
      field: "Scheme",
      headerName: "Scheme",
      width: 150,
      renderCell:(row)=>{
          return(<Chip label={row.row.schemeDetails.length}/>)
      }
    },
    {
      field: "IsActive",
      headerName: "Active",
      width: 150,
      renderCell:(row)=>{
  return(<Switch checked={!row.row.isDisable}  onChange={(e)=>{
        let disableData = {"isDisable":!e.target.checked}
        dispatch(disableDepartmant({id:row.row._id, data:disableData})).then((res)=>{
          getDepartmentList()
         })
      
  }}/>)
      },
      editable: false,
    },
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
        Departmant
      </Typography>
    </Toolbar>
  </AppBar>
    <div style={{display:"flex", height:"500px",marginTop:"20px",background:"white",justifyContent:"center",width:"100%",flexDirection:"column",alignItems:"center"}}>
      
    <div className="flex " style={{justifyContent:"left",width:"80%",marginBottom:"20px"}}><div style={{width:"90%"}}><Button  variant="contained" style={{background: "#6750A4"}} onClick={()=>setOpenDialog({...openDilog,open:true,type:"add"})}>Add Departmant</Button></div></div>
    <div style={{minWidth:"300px",maxWidth:"100%",width:"80%",background:"white"}}>
          
          <div style={{ height: 400, width: "100%", background: "white" }}>
            <DataGrid
              rows={departmants}
              columns={columns}
              pageSize={5}
              getRowId={(row) =>  row._id}
              onRowClick={Handle}
              rowsPerPageOptions={[5]}
            />
          </div>
      </div>
    </div>
        <Model action={openDilog} getDepartmentList={getDepartmentList} setOpenAlert={setOpenAlert} singleDepartmantInformation={singleDepartmantInformation} dispatch={dispatch} setAction={setOpenDialog}/>
    
        <AlertMssg  action={openAlert} setAction={setOpenAlert}/>
    </div>
  );
}
