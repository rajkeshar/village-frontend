import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Switch, Chip } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { schemeList, deleteDepartman,deleteQuestion } from "../../Services/Apis/Api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import AlertMssg from "../Alert/Alert";
import { useParams } from "react-router-dom";
// import SchemeModel from "./schemeModel";
import SchemeModel from "./SchemeModel";
import QuestionModel from "./QuestionModel";

export default function Question() {
  const Handle = () => {
    "Hello";
  };
  const dispatch = useDispatch();
  const [departmants, setDepartmants] = React.useState([]);
  const [openDilog, setOpenDialog] = React.useState({
    open: false,
    type: "add",
  });
  var userData = JSON.parse(localStorage.getItem("User"))

  const [openAlert, setOpenAlert] = React.useState({
    open: false,
    mssg: "add",
    type: "success",
  });
  const [singleDepartmantInformation, setSingleDepartmantInformation] =
    React.useState({});

  const { departmentId, schemeId } = useParams();
  var userData = JSON.parse(localStorage.getItem("User"))

  const getDepartmentList = () => {
    dispatch(schemeList(departmentId)).then((res) => {
      let schemesData = res.payload.data.filter((questions) => {
        return questions.schemeId == schemeId;
      });
      console.log(schemesData, schemeId);
      setDepartmants(schemesData[0].questionnaire);
    });
  }; 
  React.useEffect(() => {
    getDepartmentList();
  }, []);
  const editDepartmant = (singleDepartmant) => {
    console.log(singleDepartmant,"sisingleDepartmantng")
    
    setSingleDepartmantInformation({...singleDepartmant});
    
    setOpenDialog({ ...openDilog, open: true, type: "edit" });
  };
  function deleteSingleDepartmant(singleDepartmant) {
    const response = dispatch(deleteQuestion({questionId:singleDepartmant._id,departmentId:departmentId,schemeId:schemeId}))
      .then((res) => {
        console.log(res);
        setOpenAlert({
          open: true,
          mssg: "Question delete successfully",
          type: "success",
        });
        getDepartmentList();
      })
      .catch((err) => {
        setOpenAlert({ open: true, mssg: "error", type: "error" });
      });
  }
  const Action = ({ row }) => {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{ color: "darkblue", cursor: "pointer", marginLeft: "5px" }}
          onClick={() => editDepartmant(row.row)}
        >
          <EditIcon />
        </div>
        {userData.role == "DistrictManager"?"": <div
          style={{ color: "darkred", cursor: "pointer", marginLeft: "5px" }}
          onClick={() => deleteSingleDepartmant(row.row)}
        >
          <DeleteIcon />
        </div>}
      </div>
    );
  };
  const columns =  userData.role == "DistrictManager"?[{
    field: "question",
    headerName: "Question",
    width: 400,
    editable: false,
  },
  {
    field: "range",
    headerName: "Range",
    width: 150,
    renderCell: (row) => {
      console.log(row.row);
      return <div>{`${row.row.range}`}</div>;
    },
    editable: false,
  }]:[
    {
      field: "question",
      headerName: "Question",
      width: 400,
      editable: false,
    },
    {
      field: "range",
      headerName: "Range",
      width: 150,
      renderCell: (row) => {
        console.log(row.row);
        return <div>{`${row.row.range}`}</div>;
      },
      editable: false,
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
            Question
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
         { userData.role == "DistrictManager"?"" :<div style={{ width: "90%" }}>
            <Button
              variant="contained"
              onClick={() =>
                setOpenDialog({ ...openDilog, open: true, type: "add" })
              }
              style={{ background: "#6750A4" }}
            >
              Add question
            </Button>
          </div>}
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
              rows={departmants}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row._id}
              onRowClick={Handle}
              rowsPerPageOptions={[5]}
      
            />
          </div>
        </div>
      </div>
      <QuestionModel
        action={openDilog}
        getDepartmentList={getDepartmentList}
        setOpenAlert={setOpenAlert}
        singleDepartmantInformation={singleDepartmantInformation}
        setSingleDepartmantInformation={setSingleDepartmantInformation}
        dispatch={dispatch}
        setAction={setOpenDialog}
      />

      <AlertMssg action={openAlert} setAction={setOpenAlert} />
    </div>
  );
}
