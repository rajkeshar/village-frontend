import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser, edituser } from '../../Services/Apis/Api';
// import useMediaQuery from '@mui/material';


const EditModel = ({ openDilog, apiCall, setOpenDialog, singleUser, setOpenAlert, openAlert }) => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
    contactNumber: "",
    role: "",
  });

  const [userDataError, setUserDataError] = useState({
    fullname: false,
    email: false,
    password: false,
    contactNumber: false,
    role: false,
  });
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(openDilog)
    if (openDilog.type == "edit") {
      console.log("jiii", singleUser)
      setUserData({
        fullname: singleUser.fullname,
        email: singleUser.email,
        contactNumber: singleUser.contactNumber,
        role: singleUser.role
      })
    }
    else {
      console.log("jiii2")

      setUserData({
        fullname: "",
        email: "",
        password: "",
        contactNumber: "",
        role: "",
      })
    }

  }, [openDilog])


  async function addUserData() {
    try {
    if(openDilog.type == "add")
    {
      if (userData.fullname && userData.fullname.length > 2) {
        if (userData.fullname.match(/^[A-Za-z\s]+$/)) {
          setUserDataError({ ...userData, fullname: false })

          if (userData.email && /.+@.+\.[A-Za-z]+$/.test(userData.email)) {
            setUserDataError({ ...userData, email: false })

            if (openDilog.type != "edit") {
              if (userData.password) {
                setUserDataError({ ...userData, password: false })

                  
                if (`${userData.contactNumber}`.length == 10)  {
                  setUserDataError({ ...userData, contactNumber: false })


                  if (userData.role) {
                    setUserDataError({ ...userData, role: false })


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

                    var id = `empID${components.join("")}`;


                    const response =
                      openDilog.type == "edit"
                        ? await dispatch(edituser({ data: userData, id: singleUser._id }))
                        : await dispatch(addUser({ ...userData, EmpID: id }));
                    console.log(response?.payload?.response?.data?.message);

                    // if(response.payload.message == "User Created Successfully")
                    // {
                    if (response?.payload?.response?.data?.message == "This User is already exist!") {
                      setOpenAlert({
                        open: true,
                        mssg: "This User is already exist!",
                        type: "error",
                      });
                    }
                    else {
                      apiCall()

                      setOpenAlert({
                        open: true,
                        mssg:
                          openDilog.type == "edit"
                            ? "User edit successfully"
                            : `user add successfully`,
                        type: "success",
                      });
                    }

                    // }else{
                    //   setOpenAlert({
                    //     open:true,
                    //     mssg:openDilog.type=="edit"?"User edit successfully":`already exist`,
                    //     type:"warning"
                    // })
                    // }

                    setOpenDialog({ ...openDilog, open: false });
                  }
                  else {
                    setUserDataError({ ...userData, role: true })
                    console.log("r")

                  }
                }
                else {
                  setUserDataError({ ...userData, contactNumber: true })

                  console.log("c")

                }
              }
              else {
                setUserDataError({ ...userData, password: true })

                console.log("p")

              }
            }
            else {
              if (userData.contactNumber) {
                setUserDataError({ ...userData, contactNumber: false })


                if (userData.role) {
                  setUserDataError({ ...userData, role: false })


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

                  var id = `empID${components.join("")}`;


                  const response =
                    openDilog.type == "edit"
                      ? await dispatch(edituser({ data: userData, id: singleUser._id }))
                      : await dispatch(addUser({ ...userData, EmpID: id }));
                  console.log(response.payload.data, "jiiijjj");

                  // if(response.payload.message == "User Created Successfully")
                  // {
                  apiCall(response.payload.data)
                  setOpenAlert({
                    open: true,
                    mssg:
                      openDilog.type == "edit"
                        ? "User edit successfully"
                        : `user add successfully`,
                    type: "success",
                  });

                  // }else{
                  //   setOpenAlert({
                  //     open:true,
                  //     mssg:openDilog.type=="edit"?"User edit successfully":`already exist`,
                  //     type:"warning"
                  // })
                  // }

                  setOpenDialog({ ...openDilog, open: false });
                }
                else {
                  setUserDataError({ ...userData, role: true })
                  console.log("r")

                }
              }
              else {
                setUserDataError({ ...userData, contactNumber: true })

                console.log("c")

              }

            }
          }
          else {
            setUserDataError({ ...userData, email: true })

            console.log("e")

          }
        }
        else {
          setUserDataError({ ...userData, fullname: true })
          console.log("f")
        }
      }
      else {
        
        setUserDataError({ ...userData, fullname: true })
        console.log("f")
      }
    }
    else
    {
      if (userData.fullname && userData.fullname.length > 2) {
        if (userData.fullname.match(/^[A-Za-z\s]+$/)) {
          setUserDataError({ ...userData, fullname: false })
        
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

          var id = `empID${components.join("")}`;


          const response =
            openDilog.type == "edit"
              ? await dispatch(edituser({ data: userData, id: singleUser._id }))
              : await dispatch(addUser({ ...userData, EmpID: id }));
          console.log(response.payload.data, "jiiijjj");

          // if(response.payload.message == "User Created Successfully")
          // {
          apiCall(response.payload.data)
          setOpenAlert({
            open: true,
            mssg:
              openDilog.type == "edit"
                ? "User edit successfully"
                : `user add successfully`,
            type: "success",
          });

          // }else{
          //   setOpenAlert({
          //     open:true,
          //     mssg:openDilog.type=="edit"?"User edit successfully":`already exist`,
          //     type:"warning"
          // })
          // }

          setOpenDialog({ ...openDilog, open: false });
        
        }
        else{
          setUserDataError({ ...userData, fullname: true })
          console.log("f")
        }

      }
      else {
        
        setUserDataError({ ...userData, fullname: true })
        console.log("f")
      }
    }
      //   getDistrict();
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

      <Dialog open={openDilog.open} onClose={() => setOpenDialog({ ...openDilog, open: false })}>
        <DialogTitle>{openDilog.type == "add" ? "Add User" : "Edit User"}</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              type="text"
              value={userData.fullname}
              onChange={(e) =>
                setUserData({ ...userData, fullname: e.target.value })
              }
              fullWidth
              variant="outlined"
              error={userDataError.fullname ? userData.fullname.length <= 2 || !userData.fullname || userData.fullname.includes("@") || !userData.fullname.match(/^[A-Za-z\s]+$/) : false}
            />
           {openDilog.type == "add"?<> <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              fullWidth
              variant="outlined"
              error={userDataError.email ? /.+@.+\.[A-Za-z]+$/.test(userData.email) ? false : true : false}
            />
            <TextField
              autoFocus
              type="number"
              margin="dense"
              label="Contact Number"

              inputProps={{ maxLength: 10 }}
              value={userData.contactNumber}

              onChange={(e) =>
                setUserData({ ...userData, contactNumber: e.target.value })
              }
              fullWidth
              variant="outlined"
              error={userDataError.contactNumber}


            /></>:""}

            {openDilog.type == "add" ? <TextField
              autoFocus
              margin="dense"
              label="Password"
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              fullWidth
              variant="outlined"
              error={userDataError.password ? !userData.password : false}

            /> : ""}


            {openDilog.type == "add"?singleUser.role != "superadmin" ? <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userData.role}
                label="Role"
                error={userDataError.role ? !userData.role : false}


                onChange={(e) =>
                  setUserData({ ...userData, role: e.target.value })
                }
              >
                <MenuItem value="VillageManager">Village Surveyor</MenuItem>
                <MenuItem value="DistrictManager">District Manager</MenuItem>
                <MenuItem value="admin">
                  Admin
                </MenuItem>
              </Select>
            </FormControl> : "":""}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={addUserData}>Save</Button>
          <Button onClick={() => setOpenDialog({ ...openDilog, open: false })}>Cancel</Button>
        </DialogActions>

      </Dialog>
    </div>
  )
}

export default EditModel
