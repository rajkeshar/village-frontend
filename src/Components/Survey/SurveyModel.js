import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  addZone,
  editSurvey,
  addSurvey,
  changeSurveyStatus,
  changeSurveyStatusTofalse,
} from "../../Services/Apis/Api";
import { useParams } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { DateField } from '@mui/x-date-pickers/DateField';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import DatePicker from "react-datepicker";

export default function SurveyModel({
  action,
  departmants,
  dispatch,
  district,
  getDistrict,
  setAction,
  singleDistrict,
  setOpenAlert,
}) {
  const [open, setOpen] = React.useState(false);
  const [block, setBlock] = React.useState("");
  const { zoneId, zoneName } = useParams();
  const [selectedDistrict, setSelectedDistrict] = React.useState({});
  const [selectedBlocks, setSelectedBlocks] = React.useState([]);
  const [selectedVilleges, setSelectedVilleges] = React.useState([]);
  const [surveyData, setSurveyData] = React.useState(singleDistrict);
  const [startDate, setStartDate] = React.useState(
    dayjs("2014-08-18T21:11:54")
  );

  console.log(zoneId, zoneName, "zoneId");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeDialog = () => {
    setAction({ ...action, open: false });
    setBlock("");
  };

  React.useEffect(() => {
    console.log(singleDistrict, "hii");

    action.type == "edit" ?     setSurveyData(singleDistrict) :     setSurveyData({
      surveyEndDate:"",
      surveyStartDate:"",
      surveyName:""
    });

  }, [singleDistrict, action]);
  async function addScheme() {
    try {
      var date = new Date();
      var components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
      ];

      var id = `block${components.join("")}`;

      var data = {
        blockUniqueId: singleDistrict.blockUniqueId,
        blockName: block,
      };
      const response =
        action.type == "edit"
          ? await dispatch(
              editSurvey({ data: surveyData, id: singleDistrict._id })
            )
          : await dispatch(addSurvey(surveyData));
      console.log(response);
      setSurveyData({
        surveyEndDate:"",
        surveyStartDate:"",
        surveyName:""
      })
      setOpenAlert({
        open: true,
        mssg:
          action.type == "edit"
            ? "Survey edit successfully"
            : "Survey add successfully",
        type: "success",
      });
      setAction({ ...action, open: false });
      getDistrict();
    } catch (err) {
      setOpenAlert({
        open: true,
        mssg: "Something Wrong",
        type: "Error",
      });
    }
  }
  const setBlockData = (e) => {
    setSelectedDistrict(district[e.target.value]);
    setSelectedBlocks(district[e.target.value].blocks);
    setSurveyData({
      ...surveyData,
      districtName: district[e.target.value].districtName,
    });

    console.log(selectedDistrict);
  };
  const setVillegeData = (e) => {
    console.log(selectedBlocks[e.target.value].villages, "lklk");

    setSelectedVilleges(selectedBlocks[e.target.value].villages);
    setSurveyData({
      ...surveyData,
      blockName: selectedBlocks[e.target.value].blockName,
    });
  };
  async function startSurvey() {
    try {
      console.log(singleDistrict);
      let res = await dispatch(changeSurveyStatus(singleDistrict.id));
      setOpenAlert({
        open: true,
        mssg: "survey is start",
        type: "success",
      });
      getDistrict();
      setAction({ ...action, open: false });
    } catch (err) {
      setOpenAlert({
        open: true,
        mssg: "Something Wrong",
        type: "Error",
      });
    }
  }

  async function stopServey() {
    try {
      console.log(singleDistrict);
      let res = await dispatch(changeSurveyStatusTofalse(singleDistrict.id));
      setOpenAlert({
        open: true,
        mssg: "survey is start",
        type: "success",
      });
      getDistrict();
      setAction({ ...action, open: false });
    } catch (err) {
      setOpenAlert({
        open: true,
        mssg: "Something Wrong",
        type: "Error",
      });
    }
  }
  return (
    <div>
      <Dialog open={action.open} onClose={() => closeDialog()}>
        <DialogTitle>
          {action.for != "confirm"
            ? action.type == "add"
              ? "Add Survey"
              : "Edit Survey"
            : ""}
        </DialogTitle>
        <DialogContent>
          {action.for != "confirm" ? (
            <div>
              <TextField
                autoFocus
                margin="dense"
                label="Survey Name"
                type="text"
                value={surveyData.surveyName}
                onChange={(e) =>
                  setSurveyData({ ...surveyData, surveyName: e.target.value })
                }
                fullWidth
                variant="outlined"
              />
              {/* <TextField
          autoFocus
          margin="dense"
          label="SurveyOrName"
          type="text"
          value={surveyData.surveyorName}
          onChange={(e) => setSurveyData({...surveyData,surveyorName:e.target.value})}
          fullWidth
          variant="outlined"
        />
        <FormControl style={{marginTop:"10px"}} fullWidth>
            <InputLabel id="demo-simple-select-label">Departmant</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={surveyData.departmentName}
              label="Departmant"
              onChange={(e) => setSurveyData({...surveyData,departmentName:e.target.value})}

            >
              {
                departmants? departmants.map((singleDepartmantData,index)=>{
                  return(<MenuItem key={index} value={singleDepartmantData.deptName}>{singleDepartmantData.deptName}</MenuItem>)
                }):""
              }
            </Select>
          </FormControl>
          <FormControl style={{marginTop:"10px"}} fullWidth>
            <InputLabel id="demo-simple-select-label">District</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="District"
              onChange={setBlockData}
            >
              {
                district? district.map((singleDistrictData,index)=>{
                  return(<MenuItem key={index} value={index}>{singleDistrictData.districtName}</MenuItem>)
                }):""
              }
            </Select>
          </FormControl>
          <FormControl style={{marginTop:"10px"}} fullWidth>
          <InputLabel id="demo-simple-select-label">Block</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
           
            label="Block"
            onChange={setVillegeData}
        
          >
            {selectedBlocks?selectedBlocks.map((blockData,index)=>{
              return(<MenuItem key={index} value={index}>{blockData.blockName}</MenuItem>)
            }):""}
          </Select>
        </FormControl>
        <FormControl style={{marginTop:"10px"}}fullWidth>
        <InputLabel id="demo-simple-select-label">Village</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
   
          label="Village"
          onChange={(e)=>setSurveyData({...surveyData,villageName:e.target.value})}
         
        >
            {selectedVilleges?selectedVilleges.map((villege,index)=>{
              return(<MenuItem key={index} value={villege.villageName}>{villege.villageName}</MenuItem>)
            }):""}
        </Select>
          </FormControl>*/}

              {/* <TextField
          label="Start Date"
          type="date"
         fullWidth
          
          value={surveyData.surveyStartDate}
          onChange={(e) => setSurveyData({...surveyData,surveyStartDate:`${e.target.value}`})}
          style={{marginTop:"10px"}}
          min={new Date()}

 
        /> */}
        <div style={{marginTop:"20px"}}>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Start Date"
                  value={surveyData.surveyStartDate}
                  format="MM/dd/yyyy"
                  onChange={(newValue) => {
                    setSurveyData({ ...surveyData, surveyStartDate: new Date(newValue) });
                  }}
                  disablePast
                  
                />
              </LocalizationProvider>

            </div>
            <div style={{marginTop:"20px"}}>
              
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="End Date"
                  format="MM/dd/yyyy"
                  value={surveyData.surveyEndDate}
                  onChange={(newValue) => {
                    setSurveyData({ ...surveyData, surveyEndDate: new Date(newValue) });
                  }}
                />
              </LocalizationProvider>

              </div>

              {/* <TextField
        label="End Date"
        type="date"
      fullWidth
        value={surveyData.surveyEndDate}
        onChange={(e) => setSurveyData({...surveyData,surveyEndDate:`${e.target.value}`})}
        style={{marginTop:"10px"}}
  
      /> */}
            </div>
          ) : (
            "Are you sure you want to start survay"
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>Cancel</Button>
          {action.for != "confirm" ? (
            <Button onClick={() => {
              addScheme()
              
            
            }}>Add</Button>
          ) : (<>
            {singleDistrict.row.IsOnGoingSurvey == "pending" ?<Button onClick={() => {startSurvey()
              setSurveyData({
                surveyEndDate:"",
                surveyStartDate:"",
                surveyName:""
              })
            
            }}>start</Button>:<Button onClick={() => {stopServey()
              setSurveyData({
                surveyEndDate:"",
                surveyStartDate:"",
                surveyName:""
              })
            
            }}>Stop</Button>}
          </>)}
        </DialogActions>
      </Dialog>
    </div>
  );
}
