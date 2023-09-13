import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { departmantList,getSelectedListOfVillagesAndDepartmant,addAssignmentOfDepartmsnt,removeAssignmentOfDepartmsnt } from "../../Services/Apis/Api";
import { useDispatch } from "react-redux";

const UserDepartmantModel = ({ singleUser,dialogOpenForDepartmant,setDialogOpenForDepartmant }) => {
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");

  const dispatch = useDispatch();
  const [departmants, setDepartmants]= useState([])
  const [selectedDepartmants, setSelectedDepartmants]= useState([])

  const [selectedDepartmantsList, setSelectedDepartmantsList]= useState([])

  const [checkSelectedDepartmants, setCheckSelectedDepartmants]= useState([])




  useEffect(()=>{
    apiCallForAllDepartmant()
    apiCallForAllSelectedDepartmant()
  },[dialogOpenForDepartmant])

  useEffect(()=>{
    console.log(selectedDepartmants)
  },[selectedDepartmants])

  function apiCallForAllDepartmant() {
    dispatch(departmantList()).then((res) => {
      console.log(res.payload.data, "akk");
      setDepartmants(res.payload.data);
    });
  }

  function apiCallForAllSelectedDepartmant() {
    dispatch(getSelectedListOfVillagesAndDepartmant(singleUser._id)).then((res) => {
      console.log(res.payload.data.deptList, "akk2");
     
    //   setDepartmants(res.payload.data);
    setSelectedDepartmantsList( res.payload.data.deptList.filter((dis)=>dis.isDisable == false))
    });
  }

  function assignDepartmant()
  {
    dispatch(
        addAssignmentOfDepartmsnt({
          id: singleUser._id,
          data: selectedDepartmants,
        })).then((res)=>{
            console.log(res)
        apiCallForAllSelectedDepartmant()
        
        setSelectedDepartmants([])
        setCheckSelectedDepartmants([])
    
          })
    ;


  }
  
  function removeDepartmant()
  {
     dispatch( removeAssignmentOfDepartmsnt({
        id: singleUser._id,
        data: checkSelectedDepartmants,
      })).then((res)=>{
        console.log(res)
    apiCallForAllSelectedDepartmant()
    
    setSelectedDepartmants([])
    setCheckSelectedDepartmants([])


      })

  }

  const filterDepartmant = departmants?departmants.filter((departmant,index) =>
{
     return departmant.deptName.toLowerCase().includes(search.toLowerCase())
      
}):[]

const filterSelectedDepartmant = selectedDepartmantsList?selectedDepartmantsList.filter((departmant,index) =>
{
     return departmant.deptName.toLowerCase().includes(search2.toLowerCase())
      
}):[]


  return (
    <div>
      <Dialog open={dialogOpenForDepartmant} onClose={()=>{
        setDialogOpenForDepartmant(false)
        
        setSelectedDepartmants([])
        setCheckSelectedDepartmants([])

    
    }}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <Box style={{ display: "flex", gap: "20px" }}>
            <Box>
              <TextField
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "250px" }}
              />


              <Box
                boxShadow={2}
                style={{ padding: "0", height: "300px", overflowY: "scroll" }}
              >
                 <div style={{padding:"10px"}}><input style={{marginRight:"10px"}} type="checkbox"  onChange={(e)=>{
                        if(e.target.checked)
                        {
                            departmants.map((res)=>{
                                selectedDepartmants.push(res._id)
                                setSelectedDepartmants([...selectedDepartmants])
                            })
                        }
                        else{

                            setSelectedDepartmants([])

                        }
                 }}/>Select All</div>
                {filterDepartmant.map((departmant)=>{

                    return(
                        <div style={{padding:"10px",display:"flex"}}><input value={departmant._id} checked={selectedDepartmants.includes(departmant._id)}  onChange={(e)=>{
                            if(e.target.checked)
                            {
                                selectedDepartmants.push(e.target.value)
                                    setSelectedDepartmants([...selectedDepartmants])
                            }
                            else
                            {
                                let final = selectedDepartmants.filter((ids)=>{
                                    return ids != e.target.value
                                })

                                setSelectedDepartmants([...final])


                            }
                        }} style={{marginRight:"10px"}} type="checkbox"/><div>{departmant.deptName}</div></div>
                    )
                })}
              </Box>
            </Box>
            <Box>
              <TextField
                placeholder="Search"
                onChange={(e) => setSearch2(e.target.value)}
                style={{ width: "250px" }}
              />


              <Box
                boxShadow={2}
                style={{ padding: "0", height: "300px", overflowY: "scroll" }}
              >
                 <div style={{padding:"10px"}}><input style={{marginRight:"10px"}} type="checkbox"  onChange={(e)=>{
                        if(e.target.checked)
                        {
                            selectedDepartmantsList.map((res)=>{
                                checkSelectedDepartmants.push(res.deptId)
                                setCheckSelectedDepartmants([...checkSelectedDepartmants])
                            })
                        }
                        else{

                            setCheckSelectedDepartmants([])

                        }
                 }}/>Select All</div>
                {filterSelectedDepartmant.map((departmant)=>{

                    return(
                        <div style={{padding:"10px",display:"flex"}}><input value={departmant.deptId} checked={checkSelectedDepartmants.includes(departmant.deptId)}  onChange={(e)=>{
                            if(e.target.checked)
                            {
                                checkSelectedDepartmants.push(e.target.value)
                                    setCheckSelectedDepartmants([...checkSelectedDepartmants])
                            }
                            else
                            {
                                let final = checkSelectedDepartmants.filter((ids)=>{
                                    return ids != e.target.value
                                })

                                setCheckSelectedDepartmants([...final])


                            }
                        }} style={{marginRight:"10px"}} type="checkbox"/><div>{departmant.deptName}</div></div>
                    )
                })}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions>
        <Button onClick={assignDepartmant} disabled={selectedDepartmants.length == 0}>Assign</Button>
        <Button onClick={removeDepartmant}  disabled={checkSelectedDepartmants.length ==0 }>Remove</Button>
        <Button onClick={()=>
            {
                setDialogOpenForDepartmant(false)

                setSelectedDepartmants([])
                setCheckSelectedDepartmants([])

                
        }}>Cancel</Button>
      </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserDepartmantModel;
