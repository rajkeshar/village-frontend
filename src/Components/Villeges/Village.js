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
import { talukaList,deleteVillage,surveyList } from "../../Services/Apis/Api";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import Model from "./Departmant/Model";
import AlertMssg from "../Alert/Alert";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
// import DistrictModel from "./DistrictModel";
import { useParams } from "react-router-dom";
import VillageModel from "./VillageModel";

export default function Village() {
  const Handle = () => {
    "Hello";
  };
  // const {zoneId,blockUniqueId} = useParams()
  const {zoneId,districtName,blockUniqueId,} = useParams()

  const dispatch = useDispatch()
  const [village,setVillages] = React.useState([])
  const [taluka,setTalukas] = React.useState({})
  const [blockData,setBlockData] = React.useState({})

  var userData = JSON.parse(localStorage.getItem("User"))

  
  const [openDilog,setOpenDialog] = React.useState({
    open:false,
    type:"add",
    for:"villege"
  })
  const [openAlert,setOpenAlert] = React.useState({
    open:false,
    mssg:"add",
    type:"success"
  })
  const [singleDistrict,setSingleDistrict] = React.useState({})
  const [editableData, seEditableData] = React.useState(false)

  const navigate = useNavigate()
 

  const getDistrict = ()=>{


    dispatch(talukaList({zoneId,blockUniqueId})).then((res)=>{
        console.log(res.payload.data,"jkl")
        setTalukas(res.payload.data[0].blocks[0].taluka)
        let villages = []
        res.payload.data[0].blocks[0].taluka.villages.map((vill,index)=>{
          villages.push({index:index + 1,...vill})
        })
        setVillages(villages)
        setBlockData(res.payload.data[0].blocks[0])
    })
  }
  React.useEffect(() => {

    getDistrict()
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
  }, [])
const editDepartmant = (singleDepartmant)=>{
  setOpenDialog({...openDilog,open:true,type:"edit"})
  setSingleDistrict(singleDepartmant)
}
 function deleteSingleDepartmant (singleDepartmant){
  console.log(singleDepartmant,"singleDepartmant")
  let data = {blockUniqueId:blockUniqueId,blockName:blockData.blockName,villageUniqueId:singleDepartmant.villageUniqueId,talukaUniqueId:taluka.talukaUniqueId}
  const response =  dispatch(deleteVillage({id:zoneId,data:data})).then((res)=>{
    console.log(res)
    setOpenAlert({open:true,mssg:"departmant delesetSingleDistrictte successfully",type:"success"})
    getDistrict()
  }). catch((err)=>{
    setOpenAlert({open:true,mssg:"error",type:"error"})
  })
}
  const Action = ({row})=>{
    return(
      <div style={{display:"flex"}}>
           <div  style={{color:"darkblue",cursor:"pointer",marginLeft:"5px"}} onClick={()=>editDepartmant(row.row)}><EditIcon/></div>
           {userData.role == "DistrictManager"? "":<div style={{color:"darkred",cursor:"pointer",marginLeft:"5px"}} onClick={()=>deleteSingleDepartmant(row.row)}><DeleteIcon/></div>}
         
          {/* <div style={{color:"green",cursor:"pointer",marginLeft:"5px"}} onClick={()=>navigate(`/dashboard/department/${row.row._id}/${row.row.deptName}`)}><VisibilityIcon/></div>*/}
          
      </div>
    )
  }
  const columns = [
    { field: "index", headerName: "Sr No", width: 250 },
    {
      field: "villageName",
      headerName: "Village",
      width: 150
    },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      renderCell:(row)=>{
          return(<div>{!editableData?<Action row={row}/>:"survey is running"}</div>)
      },
    }
  ];

  const deleteTaluka = ()=>{
 
  }
  

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
        Village
      </Typography>
    </Toolbar>
  </AppBar>
    <div style={{display:"flex", height:"500px",marginTop:"20px",background:"white",justifyContent:"center",width:"100%",flexDirection:"column",alignItems:"center"}}>
      
    {userData.role == "DistrictManager"?"":taluka.talukaName?<div className="flex " style={{justifyContent:"left",width:"80%",marginBottom:"20px"}}><div style={{width:"90%"}}><Button  variant="contained" style={{background: "#6750A4"}} onClick={()=>setOpenDialog({...openDilog,open:true,type:"add",for:"village"})}>Add Village</Button></div></div>:<div className="flex " style={{justifyContent:"left",width:"80%",marginBottom:"20px"}}><div style={{width:"90%"}}><Button  variant="contained" style={{background: "#6750A4"}} onClick={()=>setOpenDialog({...openDilog,open:true,type:"add",for:"taluka"})}>Add Taluka</Button></div></div>}
    <div style={{minWidth:"300px",maxWidth:"100%",width:"80%",background:"white"}}>
          
          <div style={{ height: 400, width: "100%", background: "white" }}>
         {taluka.talukaName?  <DataGrid
              rows={village}
              columns={columns}
              pageSize={5}
              getRowId={(row) =>  row.villageUniqueId}
              onRowClick={Handle}
              rowsPerPageOptions={[5]}
            
  />:""}
          </div>
      </div>
    </div>
        {/*<Model action={openDilog} getDistrict={getDistrict} setOpenAlert={setOpenAlert} singleDistrict={singleDistrict} dispatch={dispatch} setAction={setOpenDialog}/>*/}
        <VillageModel  blockData={blockData} action={openDilog} getDistrict={getDistrict} taluka={taluka} setOpenAlert={setOpenAlert} singleDistrict={singleDistrict} dispatch={dispatch} setAction={setOpenDialog}/>
        <AlertMssg  action={openAlert} setAction={setOpenAlert}/>
    </div>
  );
}
