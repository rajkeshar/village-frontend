import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Switch, Chip, Dialog, DialogActions, DialogContent } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import {
  schemeList,
  deleteDepartmant,
  deleteSchema,
} from "../../Services/Apis/Api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import AlertMssg from "../Alert/Alert";
import { useParams } from "react-router-dom";
// import SchemeModel from "./schemeModel";
import SchemeModel from "./SchemeModel";
import { useNavigate } from "react-router-dom";

export default function SingleDepartmentSchema() {
  const Handle = () => {
    "Hello";
  };
  const dispatch = useDispatch();
  const [departmants, setDepartmants] = React.useState([]);
  const [openDilog, setOpenDialog] = React.useState({
    open: false,
    type: "add",
  });
  const [deleteDrawer, setDeleteDrawer] = React.useState(false)
  const [deleteScheData, setDeleteScheData] = React.useState({})
  var userData = JSON.parse(localStorage.getItem("User"))

  const [openAlert, setOpenAlert] = React.useState({
    open: false,
    mssg: "add",
    type: "success",
  });
  const [singleDepartmantInformation, setSingleDepartmantInformation] =
    React.useState({});
  const { departmentId } = useParams();
  const navigate = useNavigate();

  const getDepartmentList = () => {
    dispatch(schemeList(departmentId)).then((res) => {
      setDepartmants(res.payload.data);
      console.log(res.payload);
    });
  };
  React.useEffect(() => {
    getDepartmentList();
  }, []);
  const editDepartmant = (singleDepartmant) => {
    setOpenDialog({ ...openDilog, open: true, type: "edit" });
    setSingleDepartmantInformation(singleDepartmant);
  };
  function deleteSingleDepartmant(singleDepartmant) {
    const response = dispatch(
      deleteSchema({
        departmentId: departmentId,
        schemeId: singleDepartmant.schemeId,
      })
    )
      .then((res) => {
        console.log(res);
        setOpenAlert({
          open: true,
          mssg: "Scheme delete successfully",
          type: "success",
        });
        getDepartmentList();
        setDeleteDrawer(false)
      })
      .catch((err) => {
        setOpenAlert({ open: true, mssg: "error", type: "error" });
        setDeleteDrawer(false)

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
      {userData.role == "DistrictManager"?"":  <div
          style={{ color: "darkred", cursor: "pointer", marginLeft: "5px" }}
          onClick={() =>
            {
              setDeleteDrawer(true)
              setDeleteScheData(row.row) 
            }}
        >
          <DeleteIcon />
        </div>}
        <div
          style={{ color: "darkgreen", cursor: "pointer", marginLeft: "5px" }}
          onClick={() =>
            navigate(`/dashboard/question/${departmentId}/${row.row.schemeId}`)
          }
        >
          <VisibilityIcon />
        </div>
      </div>
    );
  };
  const columns = [
    { field: "schemeId", headerName: "ID", width: 250 },
    {
      field: "schemeName",
      headerName: "Scheme Name",
      width: 150,
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
            Schema
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
              onClick={() =>
                setOpenDialog({ ...openDilog, open: true, type: "add" })
              }
              style={{ background: "#6750A4" }}
            >
              Add Scheme
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
      <SchemeModel
        action={openDilog}
        getDepartmentList={getDepartmentList}
        setOpenAlert={setOpenAlert}
        singleDepartmantInformation={singleDepartmantInformation}
        dispatch={dispatch}
        setAction={setOpenDialog}
      />

      <AlertMssg action={openAlert} setAction={setOpenAlert} />
      <Dialog  open={deleteDrawer} onClose={()=>setDeleteDrawer(false)}>
      <DialogContent>
          Are you sure you want to delete it
      
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{
          deleteSingleDepartmant(deleteScheData)


        }}>Delete</Button>
      </DialogActions>
      
   </Dialog>
   
    </div>
  );
}
