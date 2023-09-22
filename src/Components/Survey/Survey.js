import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Switch,Chip, TextField } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { zoneList,deleteDepartmant,checkMatrix,departmantList,surveyList,deleteSurvey} from "../../Services/Apis/Api";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import Model from "./Departmant/Model";
import AlertMssg from "../Alert/Alert";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import DistrictModel from "./DistrictModel";
import { useParams } from "react-router-dom";
import SurveyModel from "./SurveyModel";
import { Check } from "@mui/icons-material";

export default function Survey() {
  const Handle = () => {
    "Hello";
  };
  const {zoneId} = useParams()
  const dispatch = useDispatch()
  const [district,setDistrict] = React.useState([])
  const [openDilog,setOpenDialog] = React.useState({
    open:false,
    type:"add",
    for:"sure"
  })
  const [openAlert,setOpenAlert] = React.useState({
    open:false,
    mssg:"add",
    type:"success"
  })
  const [singleDistrict,setSingleDistrict] = React.useState({})
  const [departmants, setDepartmants] = React.useState([])
  const navigate = useNavigate()
  const [surveys, setSurveys] = React.useState([])
  const [isTrue, setIsTrue] = React.useState(true)
  var userData = JSON.parse(localStorage.getItem("User"))

  const getDistrict = ()=>{
    dispatch(surveyList()).then((res)=>{
      console.log(res.payload.data)
    setSurveys(res.payload.data)
  })
    dispatch(zoneList()).then((res)=>{
        console.log(res.payload.result)
      setDistrict(res.payload.result)
    })
    dispatch(departmantList()).then((res)=>{
      setDepartmants(res.payload.data)
    })
  }
  React.useEffect(() => {
    getDistrict()
  }, [])
const editDepartmant = (singleDepartmant)=>{
  setOpenDialog({...openDilog,open:true,type:"edit",for:"open"})
  setSingleDistrict(singleDepartmant)
}
 function deleteSingleDepartmant (singleDepartmant){
  const response =  dispatch(deleteSurvey(singleDepartmant._id)).then((res)=>{
    console.log(res)
    setOpenAlert({open:true,mssg:"Survey delete successfully",type:"success"})
    getDistrict()
  }). catch((err)=>{
    setOpenAlert({open:true,mssg:"error",type:"error"})
  })
}

function starSurvay(row)
{
  setSingleDistrict(row)
  setOpenDialog({open:true,
    type:"add",
    for:"confirm"})
}
  const Action = ({row})=>{
    return(
      <div style={{display:"flex"}}>
           <div style={{color:"darkblue",cursor:"pointer",marginLeft:"5px"}} onClick={()=>editDepartmant(row.row)}><EditIcon/></div>
         {userData.role == "Backend"?<div style={{color:"darkred",cursor:"pointer",marginLeft:"5px"}} onClick={()=>deleteSingleDepartmant(row.row)}><DeleteIcon/></div>:""}
          {/*<div onClick={()=>navigate(`/dashboard/department/${row.row._id}/${row.row.deptName}`)}><VisibilityIcon/></div>*/}
          
      </div>
    )
  }

  const verify = (row)=>{
     dispatch(checkMatrix()).then((res)=>{
      console.log(res.payload.message)
      if(res.payload.message == "true")
      {
        setIsTrue(false)
      }
     })
  }
  const columns = [
    { field: "surveyName", headerName: "Survey Name", width: 250 },
    {
      field: "surveyStartDate",
      headerName: "Start Date",
            
      renderCell:(row)=>{
        let date = new Date(row.row.surveyStartDate)
        let day = `${date.getDate()}`
        let ifDay = day.length == 1?`0${day}`:day
        let month = `${parseInt(date.getMonth())+1}`
        let ifMonth = month.length == 1?`0${month}`:month
        let year = `${date.getFullYear()}`
       
        return(<div>{ifDay}-{ifMonth}-{year}</div>)
    }
    },
    {
      field: "surveyEndDate",
      headerName: "End Date",
    
      renderCell:(row)=>{
        let date = new Date(row.row.surveyEndDate)
        let day = `${date.getDate()}`
        let ifDay = day.length == 1?`0${day}`:day
        let month = `${parseInt(date.getMonth())+1}`
        let ifMonth = month.length == 1?`0${month}`:month
        let year = `${date.getFullYear()}`
       
        return(<div>{ifDay}-{ifMonth}-{year}</div>)
    }
    },
    {
      field: "IsOnGoingSurvey",
      headerName: "IsOnGoingSurvey",
      width: 150,
      renderCell:(row)=>{
        return(<Chip label={row.row.IsOnGoingSurvey}/>)
    }
  },

    {
      field: "IsActive",
      headerName: "Active",
      width: 250,
      renderCell:(row)=>{
  return(<div>{row.row.IsOnGoingSurvey == "completed"?<Button type="outline" disabled>{row.row.IsOnGoingSurvey!="OnGoing"?"Start":"Stop"}</Button>:<Button type="outline" disabled={isTrue} onClick={()=>starSurvay(row)}>{row.row.IsOnGoingSurvey!="OnGoing"?"Start":"Stop"}</Button>}{row.row.IsOnGoingSurvey == "completed"?<Button type="outline" onClick={()=>verify(row)} disabled>isAllVillagesAssign</Button>:<Button type="outline" onClick={()=>verify(row)}>isAllVillagesAssign</Button>}</div>)
      },
      editable: false,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      renderCell:(row)=>{
          return(<div>{row.row.IsOnGoingSurvey == "completed"?<Check/>:<Action row={row}/>}</div>)
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
      Survey
      </Typography>
    </Toolbar>
  </AppBar>
    <div style={{display:"flex", height:"500px",marginTop:"20px",background:"white",justifyContent:"center",width:"100%",flexDirection:"column",alignItems:"center"}}>
      
    <div className="flex " style={{justifyContent:"left",width:"80%",marginBottom:"20px"}}><div style={{width:"90%"}}><Button  variant="contained" style={{background: "#6750A4"}} onClick={()=>setOpenDialog({...openDilog,open:true,type:"add",for:"open"})}>Add Survey</Button></div></div>
    <div style={{minWidth:"300px",maxWidth:"100%",width:"80%",background:"white"}}>
          
          <div style={{ height: 400, width: "100%", background: "white" }}>
           <DataGrid
              rows={surveys}
              columns={columns}
              pageSize={5}
              getRowId={(row) =>  row._id}
              onRowClick={Handle}
              rowsPerPageOptions={[5]}
  />
          </div>
      </div>
    </div>
        {/*<Model action={openDilog} getDistrict={getDistrict} setOpenAlert={setOpenAlert} singleDistrict={singleDistrict} dispatch={dispatch} setAction={setOpenDialog}/>*/}
        <SurveyModel  action={openDilog} departmants={departmants} district={district} getDistrict={getDistrict} setOpenAlert={setOpenAlert} singleDistrict={singleDistrict} dispatch={dispatch} setAction={setOpenDialog}/>
        <AlertMssg  action={openAlert} setAction={setOpenAlert}/>
    </div>
  );
}
