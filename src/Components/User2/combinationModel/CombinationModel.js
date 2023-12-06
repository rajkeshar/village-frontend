import React, { useEffect, useState } from 'react'
import { Dialog,DialogActions,DialogTitle,DialogContent ,TextField,Box, Button, Divider} from '@mui/material'
import { departmantList,deleteCombination,assignCombination,getCombination,removeAssignmentOfDepartmsnt,getSelectedListOfVillagesAndDepartmant,addAssignmentOfDepartmsnt,villegeList } from '../../../Services/Apis/Api';
import { useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
// import Select from 'react-select/dist/declarations/src/Select';
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import VillageSearch from './villageSearch';
import { Close, Delete } from '@mui/icons-material';
import { json, select } from 'd3';
import { assign } from 'lodash';

const CombinationModel = ({openAlert,setOpenAlert,openCombinationDialog,setOpenCombinationDialog,singleUser,dialogOpenForDepartmant,setDialogOpenForDepartmant}) => {
    const [search, setSearch] = useState("");
    const [search2, setSearch2] = useState("");
    const [userData, setUserData] = useState(singleUser)
  
    const dispatch = useDispatch();
    const [departmants, setDepartmants]= useState([])
    
    const [selectedDepartmants, setSelectedDepartmants]= useState([])
    const [selectedVillages, setSelectedVillages]= useState([])
   const [villageDataThatSelected, setVillageDataThatSelected] = useState([])
   const [departmantDataThatSelected, setDepartmantDataThatSelected] = useState([])
   const [combinationComeFromBackend, setCombinationComeFromBackend] = useState([])
   const [combinationComeFromBackendFilter, setCombinationComeFromBackendFilter] = useState([])

   const [alreadyAssignData, setAlreadyAssignData] = useState([])
   const [alreadyAssignFilterData, setAlreadyAssignFilterData] = useState([])

   const [successReload, setSuccessReload] = useState(false)
   const [combinationId, setCombinationId] = useState("")
   const [deleteDrawer, setDeleteDrawer] = useState(false)




   const columns = [
   
    { field: 'villageName', headerName: 'Village Name', width: 200 },
    { field: 'deptName', headerName: 'Departmant name', width: 200 },
    { field: 'userName', headerName: 'User Name',width:130},
    { field: 'Action', headerName: 'Action',width:130, renderCell:(row)=>{
      return(<div onClick={()=>{
        setCombinationId(row.row._id)
        setDeleteDrawer(true)
      }}><Delete/></div>)
  }},

    
  ];
  
  
  
  
    useEffect(()=>{
      if(singleUser)
      {
      apiCallForAllDepartmant()
      getCombinationData()
      }
    },[dialogOpenForDepartmant,alreadyAssignData,singleUser,successReload])
  
    useEffect(()=>{
      
      const uniqueArrayOfVillage = Array.from(new Set(villageDataThatSelected.map(item => item.villageId))).map(villageId => {
        return villageDataThatSelected.find(item => item.villageId === villageId);
      });

      // setSelectedVillages([...uniqueArrayOfVillage])
    
    },[departmantDataThatSelected,villageDataThatSelected])

    useEffect(()=>{
      console.log(selectedVillages,"selectedVillages")
      console.log(villageDataThatSelected,"selectedVillages")
      console.log(departmantDataThatSelected,"selectedVillages")
     



    },[selectedVillages,selectedDepartmants])

    let getCombinationData = ()=>{
      dispatch(getCombination({id:singleUser._id})).then((assignData)=>{
          console.log(assignData,"getCombinationData")
          setCombinationComeFromBackend(assignData.payload)
          setCombinationComeFromBackendFilter(assignData.payload)
      }).catch((err)=>{
        console.log(err)
      })
    }

    let sendCombination = ()=>{

      let newArrayOfCombination = []

      const uniqueArrayOfDept = Array.from(new Set(departmantDataThatSelected.map(item => item.deptId))).map(deptId => {
        return departmantDataThatSelected.find(item => item.deptId === deptId);
      });

      villageDataThatSelected.map((vill)=>{
        uniqueArrayOfDept.map((dep)=>{
          newArrayOfCombination.push({
            villageName: vill.villageName,
            villageId: vill.villageId,
            deptId:dep.deptId,
            deptName:dep.deptName,
            userID:singleUser._id,
            userEmail:singleUser.email,
            userName:singleUser.fullname
          })
        })
      })

      console.log(newArrayOfCombination,"deptName")
      dispatch(assignCombination(newArrayOfCombination)).then((res)=>{
        console.log(res)
        if(res.payload.status == 200)
        {
          setAlreadyAssignData(res.payload.alreadyAssignedCombinations)
          setAlreadyAssignFilterData(res.payload.alreadyAssignedCombinations)

          setOpenAlert({
            open:true,
            mssg:"Some Villages and Departments Are Already Assign To Same User Or Another User",
            type:"warning"
          })
        
          setTimeout(()=>{
            setOpenAlert({
              open:true,
              mssg:"Else Village And Department Assign Successfully",
              type:"success"
            })
          },3000)
         
        }
        else{
          setSuccessReload(!successReload)
          setOpenAlert({
            open:true,
            mssg:"Village And Department Assign Successfully",
            type:"success"
          })
        }
      }).catch((err)=>{
        console.log(err)
        setOpenAlert({
          open:true,
          mssg:"something is wrong",
          type:"error"
        })
      })
    }
  
    function apiCallForAllDepartmant() {
      dispatch(departmantList()).then((res) => {
        console.log(res.payload.data, "akk");
        setDepartmants(res.payload.data);
      });
    }
  
 
  
    // function assignDepartmant()
    // {
    //   dispatch(
    //       addAssignmentOfDepartmsnt({
    //         id: singleUser._id,
    //         data: selectedDepartmants,
    //       })).then((res)=>{
    //           console.log(res)
    //       apiCallForAllSelectedDepartmant()
          
    //       setSelectedDepartmants([])
    //       setCheckSelectedDepartmants([])
      
    //         })
    //   ;
  
  
    // }
    
 
    const filterDepartmant = departmants?departmants.filter((departmant,index) =>
  {
       return departmant.deptName.toLowerCase().includes(search.toLowerCase())
        
  }):[]
  

  
  return (

    <Dialog open={openCombinationDialog} onClose={() => setOpenCombinationDialog(false)} fullScreen>
    <DialogTitle style={{textTransform:"capitalize",display:"flex"}}><div style={{width:"95%"}}>{singleUser.fullname}</div><div style={{cursor:"pointer"}} onClick={()=>
      {
        setSelectedVillages([])
        setSelectedDepartmants([])
        setAlreadyAssignData([])
        setOpenCombinationDialog(false)
      
    }}><Close/> </div></DialogTitle>
    <Divider/>
    <DialogContent>
    <div >
    <div style={{
      background:"#c0c0c029",
      padding:"0px 20px",
      

 
     
    }}>  
    <div style={{height:"60px",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"20px",width:"100%"}}>Assign Villages And Departmants</div>
    <Box style={{ display: "flex", gap: "20px",flexWrap:"wrap",justifyContent:"center",width:"100%" }}>
      <div >
          <VillageSearch  selectedVillages={selectedVillages} setSelectedVillages={setSelectedVillages} singleUser={singleUser} openCombinationDialog={openCombinationDialog} villageDataThatSelected={villageDataThatSelected} setVillageDataThatSelected={setVillageDataThatSelected}/>
      </div>
      <Box>
        <TextField
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "370px" }}
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
                          departmantDataThatSelected.push({deptId:res._id,deptName:res.deptName})
                          setDepartmantDataThatSelected([...departmantDataThatSelected])
                      })
                  }
                  else{

                      setSelectedDepartmants([])
                      setDepartmantDataThatSelected([])

                  }
          }}/>Select All</div>
          {filterDepartmant.map((departmant)=>{

              return(
                  <div style={{padding:"10px",display:"flex"}}><input value={departmant._id} checked={selectedDepartmants.includes(departmant._id)}  onChange={(e)=>{
                      if(e.target.checked)
                      {
                          selectedDepartmants.push(e.target.value)
                              setSelectedDepartmants([...selectedDepartmants])
                          departmantDataThatSelected.push({deptId:e.target.value,deptName:departmant.deptName})
                          setDepartmantDataThatSelected([...departmantDataThatSelected])
                      }
                      else
                      {
                          let final = selectedDepartmants.filter((ids)=>{
                              return ids != e.target.value
                          })

                          let final2 = departmantDataThatSelected.filter((dept)=>{
                            return dept.deptId != e.target.value
                          })

                          setSelectedDepartmants([...final])
                          setDepartmantDataThatSelected([...final2])


                      }
                  }} style={{marginRight:"10px"}} type="checkbox"/><div>{departmant.deptName}</div></div>
              )
          })}
        </Box>
      </Box>
      {selectedVillages.length !=0 && selectedDepartmants.length !=0?<div style={{padding:"20px"}}><Button onClick={sendCombination}  variant="contained" style={{height:"fit-content"}}>
      Assign
  </Button></div>:<div style={{padding:"20px"}}><Button  variant="contained" disabled>Assign</Button></div>}
      <Box style={{width:"40%"}}>
      <TextField
        placeholder="Search"
        onChange={(e)=>{
          if(e.target.value)
          {
            console.log(e.target.value)
          let newArr = combinationComeFromBackendFilter.filter((filter)=>{
            return  filter.villageName.toLowerCase().includes(e.target.value.toLowerCase()) || filter.deptName.toLowerCase().includes(e.target.value.toLowerCase()) || filter.userName.toLowerCase().includes(e.target.value.toLowerCase())
          })

          setCombinationComeFromBackend([...newArr])
        }
        else{
          setCombinationComeFromBackend([...combinationComeFromBackendFilter])

        }
        }}
        style={{ width: "100%" }}
      />
    
    
      <Box
        boxShadow={2}
        style={{ width:"100%",padding: "0", height: "300px", overflowY: "scroll" }}
      >
      <DataGrid
      rows={combinationComeFromBackend}
      columns={columns}
    
      getRowId={(row) =>  row._id}
    //  pagination={false}
    
    />
    
      </Box>
    </Box>
    </Box>
  
    </div>
 
    </div>
    




    <div >
    <div style={{
      background:"#c0c0c029",
      padding:"0px 20px",
 

 
     
    }}>  
    <div style={{height:"60px",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"20px",width:"100%"}}>Already Assign Villages And Departmants</div>
    <Box style={{ display: "flex", gap: "20px",flexWrap:"wrap",justifyContent:"center",width:"100%" }}>
     
      <Box style={{width:"40%"}}>
      <TextField
        placeholder="Search"
        onChange={(e )=>{
          if(e.target.value)
          {
            console.log(e.target.value)
          let newArr = alreadyAssignFilterData.filter((filter)=>{
            return  filter.villageName.toLowerCase().includes(e.target.value.toLowerCase()) || filter.deptName.toLowerCase().includes(e.target.value.toLowerCase()) || filter.userName.toLowerCase().includes(e.target.value.toLowerCase())
          })

          setAlreadyAssignData([...newArr])
        }
        else{
          setAlreadyAssignData([...alreadyAssignFilterData])

        }
        }}
        style={{ width: "100%" }}
      />
    
    
      <Box
        boxShadow={2}
        style={{ width:"100%",padding: "0", height: "300px", overflowY: "scroll" }}
      >
      <DataGrid
      rows={alreadyAssignData}
      columns={columns}
    
      getRowId={(row) =>  row._id}
    //  pagination={false}
    />
    
      </Box>
    </Box>
    </Box>
  
    </div>
 
    </div>


    <Dialog  open={deleteDrawer} onClose={()=>setDeleteDrawer(false)}>
       <DialogContent>
           Are you sure you want to delete it
       
       </DialogContent>
       <DialogActions>
         <Button onClick={()=>{
          dispatch(deleteCombination({id:combinationId})).then((res)=>{
            console.log(res,"klkjhg")
            if(res.payload.status == 200)
            {
              setOpenAlert({
                open:true,
                mssg:"Assigment Delete Successfully",
                type:"success"
              })
              setSuccessReload(!successReload)
              setAlreadyAssignData([...alreadyAssignData.filter((ids)=>{
                return ids._id != combinationId
              })])
              setDeleteDrawer( false)
            }
            else{
              setOpenAlert({
                open:true,
                mssg:"combination not found",
                type:"warning"
              })
              setSuccessReload(!successReload)
              setDeleteDrawer(false )
            }
          }).catch((err)=>{
            setOpenAlert({
              open:true,
              mssg:"server error",
              type:"error"
            })
          })
         }}>Delete</Button>
       </DialogActions>
    </Dialog>


    
    </DialogContent>
    </Dialog>

  )
}

export default CombinationModel
