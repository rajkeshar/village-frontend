import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Toolbar, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadDepartment,uploadVillage } from '../../Services/Apis/Api';
import axios from 'axios';
import AlertMssg from "../Alert/Alert";
import { AppBar } from '@material-ui/core';


function BulkUpload() {
  const [villageFile, setVillageFile] = useState(null);
  const [departmentFile, setDepartmentFile] = useState(null);
  const [districtName, setDistrictName] = useState('');
  const [openAlert,setOpenAlert] = React.useState({
    open:false,
    mssg:"add",
    type:"success"
  })

  const handleVillageFileChange = (e) => {
    setVillageFile(e.target.files[0]);
  };

  const handleDepartmentFileChange = (e) => {
    setDepartmentFile(e.target.files[0]);
  };

  const handleDistrictNameChange = (e) => {
    setDistrictName(e.target.value);
  };

  const handleVillageUpload = () => {
    if (villageFile) {
      const formData = new FormData();
    //   formData.append('districtName', districtName);
      formData.append('districtName', villageFile);

      uploadVillage(formData).then((response) => {
          console.log('Village upload successful', response);
          // Add any success handling code here
          if(response.message == "inserted data")
          {
            setOpenAlert({
              open: true,
              mssg:"Data Upload Success",
              type: "success",
            });
          }
          else if(response.message == "this block already exist")
          {
            setOpenAlert({
              open: true,
              mssg:"This block already exist",
              type: "warning",
            });
          }
          else
          {
            setOpenAlert({
              open: true,
              mssg:"This block already exist",
              type: "error",
            });
          }
        })
       
        .catch((error) => {
          console.error('Error uploading village', error);
          // Add error handling code here
        });
    }
  };

  const handleDepartmentUpload = () => {
    if (departmentFile) {
      const formData = new FormData();
  
      formData.append('deptName', departmentFile);
      uploadDepartment(formData)
        .then((response) => {
          console.log('Department upload successful', response);
          if(response.message == "inserted data")
          {
            setOpenAlert({
              open: true,
              mssg:"Data Upload Success",
              type: "success",
            });
          }
          else 
          {
            setOpenAlert({
              open: true,
              mssg:"alredy exist",
              type: "error",
            });
          }
          // Add any success handling code here
        })
        .catch((error) => {
          console.error('Error uploading department', error);
          setOpenAlert({
            open: true,
            mssg:"Error uploading department",
            type: "error",
          });
          // Add error handling code here
        });
    }
  };

  return (
    <div style={{display:"flex",position:"relative", height:"500px",justifyContent:"center",width:"100%",flexDirection:"column",alignItems:"center"}}>
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
        Bulk Upload
      </Typography>
    </Toolbar>
  </AppBar>
    <div
    style={{
      minWidth: "300px",
      maxWidth: "100%",
      width: "80%",
      background: "#0000",
      padding:"40px 0"
    }}
  >
    <Container maxWidth="sm">
      
      <Grid container spacing={2}>

        <Grid item container xs={12}>
        
        <Grid item sm={6}>
            <input
            accept=".xlsx"
            id="village-file"
            type="file"
            style={{ display: 'none' }}
            onChange={handleVillageFileChange}
            />
            <label htmlFor="village-file">
            <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
            >
                Upload Village
            </Button>
            </label>
        </Grid>
        <Grid item sm = {6}>
        <Button
        variant="contained"
        color="primary"
        onClick={handleVillageUpload}
      >
        Submit Village
      </Button>
        </Grid>
        
        </Grid>
        <Grid item container xs={12} spacing={2}>
        <Grid item  md={6} >
        <input
        accept=".xlsx"
        id="department-file"
        type="file"
        style={{ display: 'none' }}
        onChange={handleDepartmentFileChange}
      />
            <label htmlFor="department-file">
            <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUploadIcon />}
            >
            Upload Department
            </Button>
        </label>
        </Grid>
        <Grid item md={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDepartmentUpload}
          >
            Submit Department
          </Button>
          </Grid>
        </Grid>
      </Grid>
      <AlertMssg  action={openAlert} setAction={setOpenAlert}/>

    </Container>
    </div>
    </div>
  );
}

export default BulkUpload;
