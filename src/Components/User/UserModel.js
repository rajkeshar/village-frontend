import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  addVillage,
  getSelectedListOfVillagesAndDepartmant,
  departmantList,
  edituser,
  getAllVilleges,
  addUser,
  addAssignmentOfVillege,
  getTalukaList,
  addAssignmentOfDepartmsnt,
  removeAssignmentOfDepartmsnt,
  removeAssignmentOfVillege,
} from "../../Services/Apis/Api";
import { useParams } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
} from "@mui/material";
import SelecMultiSelectionBox from "./SelecMultiSelectionBox";
import SelectMultipleDepartments from "./SelectMultipleDepartments";

import Checkbox from "@mui/material/Checkbox";
import SelecSelectedMultiSelectionBox from "./SelecSelectedMultiSelectionBox";
import DistrictVillagesList from "./DistrictVillageList";
import SelectMultiSelectionDepartment from "./SelectMultiSelectionDepartment";
import InnerComponent from "./InnerComponent";
// import {  } from '../../Services/Apis/Api';

export default function VillageModel({
  action,
  dispatch,
  getDistrict,
  setAction,
  singleDistrict,
  setOpenAlert,
}) {
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({
    fullname: "",
    email: "",
    password: "",
    contactNumber: "",
    role: "",
  });
  const [selectedVillagesList, setSelectedVillagesList] = React.useState([]);

  const [fix, setFix] = React.useState(true);
  const [selected, setSelected] = React.useState([]);
  const [departmantSelected, setDepartmantSelected] = React.useState([]);
  const [selectedVillages, setSelectedVillages] = React.useState({});

  const [villeges, setVilleges] = React.useState([]);
  const [departmant, setDepartmant] = React.useState([]);
  const [taluka, setTaluka] = React.useState([]);
  const [selectedVillage, setSelectedVillage] = React.useState([]);

  const [allVillegesData, setAllVillegesData] = React.useState([]);
  const [allDepartmantData, setAllDepartmantData] = React.useState([]);
  const [searchVillage, setSearchVillage] = React.useState("");
  const [checkedVillageArray, setCheckedVillageArray] = React.useState([]);
  const [reload, setReload] = React.useState(true);
  const selectedIdOfVillages = [];
  const [deselectedVillage, setDeselectedVillage] = React.useState([]);
  const districts = [
    {
      talukaName: "District 1",
      villages: [
        { villageUniqueId: 1, villageName: "Village 1.1" },
        { villageUniqueId: 2, villageName: "Village 1.2" },
        { villageUniqueId: 3, villageName: "Village 1.3" },
      ],
    },
    {
      talukaName: "District 2",
      villages: [
        { villageUniqueId: 4, villageName: "Village 2.1" },
        { villageUniqueId: 5, villageName: "Village 2.2" },
        { villageUniqueId: 6, villageName: "Village 2.3" },
      ],
    },
    {
      talukaName: "District 3",
      villages: [
        { villageUniqueId: 7, villageName: "Village 3.1" },
        { villageUniqueId: 8, villageName: "Village 3.2" },
        { villageUniqueId: 9, villageName: "Village 3.3" },
      ],
    },
  ];
  const [checkedDepartments, setCheckedDepartments] = React.useState([]);
  const [checkedSelectedDepartments, setCheckedSelectedDepartments] =
    React.useState([]);

  const [mutiId, setMultiId] = React.useState([]);
  const [mutiId2, setMultiId2] = React.useState([]);
  const [nmberOfAssignVill, setNumberOfAssignVill] = React.useState([]);
  const [nmberOfAssignDept, setNumberOfAssignDept] = React.useState([]);

  React.useEffect(() => {
    selectedAllVillagesByName();
  }, []);
  const selectedAllVillagesByName = () => {
    dispatch(getAllVilleges()).then((listOfVilleges) => {
      listOfVilleges.payload.data.map((listOfVillege) => {
        singleDistrict.AssignVillage.villages.map((checkVillages) => {
          console.log(listOfVillege, "listOfVillege");
          console.log(checkVillages, "listOfVillege2");

          if (checkVillages == listOfVillege.villageUniqueId) {
            selectedVillage.push(listOfVillege);
          }
        });
      });
      console.log("selectedVillage2", selectedVillage);
      setSelectedVillage(selectedVillage);
    });
  };
  async function getVillegesData() {
    let res = await dispatch(departmantList());
    setDepartmant(res.payload.data);
  }
  React.useEffect(() => {
    getVillegesData();
  }, []);

  React.useEffect(() => {
    dispatch(getTalukaList()).then((res) => {
      console.log(res.payload.data);
      setTaluka(res.payload.data);
    });
  }, []);

  const { zoneId, blockUniqueId } = useParams();
  console.log(zoneId, "zoneId");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeDialog = () => {
    setAction({ ...action, open: false });
    setUserData("");
    setMultiId2([]);
    setMultiId([]);
  };

  React.useEffect(() => {
    action.type == "edit" ? setUserData(singleDistrict) : setUserData("");
  }, [singleDistrict, action]);

  const callingDataAssignVillAndDept = () => {
    dispatch(getSelectedListOfVillagesAndDepartmant(singleDistrict._id)).then(
      (listOfSelectedVillagesAndDept) => {
        setNumberOfAssignVill(
          listOfSelectedVillagesAndDept.payload.data.villageArray
        );
        setNumberOfAssignDept(
          listOfSelectedVillagesAndDept.payload.data.deptList
        );
      }
    );
  };
  React.useEffect(() => {
    callingDataAssignVillAndDept();
  }, [action.open]);
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

      var id = `empID${components.join("")}`;

      var data = {
        blockUniqueId: blockUniqueId,
        villageUniqueId: singleDistrict.villageUniqueId,
        villageName: userData,
      };
      const response =
        action.type == "edit"
          ? await dispatch(edituser({ data: userData, id: singleDistrict._id }))
          : await dispatch(addUser({ ...userData, EmpID: id }));
      console.log(response);

      // if(response.payload.message == "User Created Successfully")
      // {
      setOpenAlert({
        open: true,
        mssg:
          action.type == "edit"
            ? "User edit successfully"
            : `user add successfully`,
        type: "success",
      });

      // }else{
      //   setOpenAlert({
      //     open:true,
      //     mssg:action.type=="edit"?"User edit successfully":`already exist`,
      //     type:"warning"
      // })
      // }

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
  async function addVillegesAssigment() {
    try {
      // let final = allVillegesData.filter((checkSelectedVillegeId,index)=>{
      //    return checkSelectedVillegeId.villageName == selected[index]
      // })

      // let catchFinalId = final.map((id)=>{
      //   return id.villageUniqueId
      // })
      // console.log(singleDistrict,"k")
      dispatch(
        addAssignmentOfVillege({ id: singleDistrict._id, data: mutiId })
      ).then((res) => {
        setFix(!fix);
      });
      setOpenAlert({
        open: true,
        mssg: "Village Assign Successfully",
        type: "success",
      });
      setAction({ ...action, open: false });
      callingDataAssignVillAndDept();

      setMultiId([]);
      setMultiId2([]);
      //  setAction({...action,open:true})

      // window.location.reload()
    } catch (err) {
      setOpenAlert({
        open: true,
        mssg: "something is wrong",
        type: "success",
      });
      setAction({ ...action, open: false });
    }
  }

  async function removeDepartment() {
    try {
      console.log("reducer2");
      let res = await dispatch(
        removeAssignmentOfDepartmsnt({
          id: singleDistrict._id,
          data: checkedSelectedDepartments,
        })
      );

      setOpenAlert({
        open: true,
        mssg: "Departmant remove Successfully",
        type: "success",
      });
      setAction({ ...action, open: false });
      getDistrict();
      // window.location.reload()
    } catch (err) {
      setOpenAlert({
        open: true,
        mssg: "something is wrong",
        type: "success",
      });
      setAction({ ...action, open: false });
    }
  }

  async function assignDepartment() {
    try {
      // console.log(departmantSelected,allDepartmantData)
      // let final = allDepartmantData.filter((checkSelectedDeptId,index)=>{
      //    return checkSelectedDeptId.deptName == departmantSelected[index]
      // })

      // let catchFinalId = final.map((id)=>{
      //   return id._id
      // })
      // console.log(catchFinalId,"klll")
      let res = await dispatch(
        addAssignmentOfDepartmsnt({
          id: singleDistrict._id,
          data: checkedDepartments,
        })
      );

      setOpenAlert({
        open: true,
        mssg: "Departmant Assign Successfully",
        type: "success",
      });
      setAction({ ...action, open: false });
      getDistrict();
      window.location.reload();
    } catch (err) {
      setOpenAlert({
        open: true,
        mssg: "something is wrong",
        type: "success",
      });
      setAction({ ...action, open: false });
    }
  }

  const removeVillegesAssigment = async () => {
    console.log(deselectedVillage, "setDeselectedVillage");
    await dispatch(
      removeAssignmentOfVillege({
        id: singleDistrict._id,
        data: selectedVillagesList,
      })
    );
    setOpenAlert({
      open: true,
      mssg: "Village remove Assignment  Successfully",
      type: "success",
    });
    setAction({ ...action, open: false });
    getDistrict();
    setSelectedVillagesList([]);
    window.location.reload();
  };
  return (
    <div>
      <Dialog
        open={action.open}
        onClose={() => {
          closeDialog();
          setMultiId([]);
        }}
      >
        <DialogTitle>
          {action.for != "Departmant"
            ? action.for == "Village"
              ? "Assign Village"
              : action.type == "add"
              ? "Add Block"
              : "Edit Block"
            : "Assign Departmant"}
        </DialogTitle>
        <DialogActions></DialogActions>
        <DialogContent>
          {action.for != "Departmant" ? (
            action.for == "Village" ? (
              <div style={{ display: "flex", textAlign: "center" }}>
                {/*<DistrictVillagesList setDeselectedVillage={setDeselectedVillage} deselectedVillage={deselectedVillage} singleDistrict={singleDistrict} districts={taluka} selectedVillages={selectedVillages} setSelectedVillages={setSelectedVillages}/>*/}
                <SelecMultiSelectionBox
                  reload={reload}
                  mutiId={mutiId}
                  mutiId2={mutiId2}
                  setMultiId={setMultiId}
                  setMultiId2={setMultiId2}
                  singleDistrict={singleDistrict}
                  data={taluka}
                  setCheckedVillageArray={setCheckedVillageArray}
                />
                <InnerComponent
                  nmberOfAssignVill={nmberOfAssignVill}
                  setSelectedVillage={setSelectedVillage}
                  selectedVillagesList={selectedVillagesList}
                  setSelectedVillagesList={setSelectedVillagesList}
                  selectedVillage={selectedVillage}
                  singleDistrict={singleDistrict}
                />
              </div>
            ) : (
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
                />
                <TextField
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
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Contact Number"
                  type="number"
                  value={userData.contactNumber}
                  onChange={(e) =>
                    setUserData({ ...userData, contactNumber: e.target.value })
                  }
                  fullWidth
                  variant="outlined"
                />
                <TextField
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
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userData.role}
                    label="Role"
                    onChange={(e) =>
                      setUserData({ ...userData, role: e.target.value })
                    }
                  >
                    <MenuItem value="VillageManager">VillageManager</MenuItem>
                    <MenuItem value="BlockManager">BlockManager</MenuItem>
                    <MenuItem value="supdistrictManager">
                      SupdistrictManager
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            )
          ) : (
            <div>
              {/*<SelectMultipleDepartments selected={departmantSelected} allDepartmantData={allDepartmantData} setAllDepartmantData={setAllDepartmantData} setSelected={setDepartmantSelected} departmant={departmant} setDepartmant={setDepartmant}/>*/}
              <SelectMultiSelectionDepartment
                checkedSelectedDepartments={checkedSelectedDepartments}
                setCheckedSelectedDepartments={setCheckedSelectedDepartments}
                checkedDepartments={checkedDepartments}
                setCheckedDepartments={setCheckedDepartments}
                singleDistrict={singleDistrict}
                selected={departmantSelected}
                allDepartmantData={allDepartmantData}
                setAllDepartmantData={setAllDepartmantData}
                setSelected={setDepartmantSelected}
                departmant={departmant}
                nmberOfAssignDept={nmberOfAssignDept}
                setDepartmant={setDepartmant}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>Cancel</Button>
          {action.for != "Departmant" ? (
            action.for == "Village" ? (
              <div>
                <Button onClick={() => addVillegesAssigment()}>Assign</Button>
                <Button onClick={() => removeVillegesAssigment()}>
                  Remove
                </Button>
              </div>
            ) : (
              <Button onClick={() => addScheme()}>Add</Button>
            )
          ) : (
            <div>
              <Button onClick={() => assignDepartment()}>Assign</Button>
              <Button onClick={() => removeDepartment()}>remove</Button>
            </div>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
