import { Box, CircularProgress, List, ListItemButton, ListItemIcon, TextField } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getAllVilleges } from '../../Services/Apis/Api'
import { useEffect } from 'react'

const InnerComponent = ({singleDistrict,nmberOfAssignVill,setSelectedVillagesList,selectedVillagesList,setSelectedVillage,selectedVillage}) => {
   const dispatch = useDispatch()
   const [listOfData, setListOfData] = React.useState([])
   const [searchValue, setSearchValue] = React.useState("")

  const allfilteredDepartments = nmberOfAssignVill.filter((village) =>
  village.villageName.toLowerCase().includes(searchValue.toLowerCase())
);

useEffect(()=>{
console.log(selectedVillagesList,"dum2")
},[selectedVillagesList])
  const handleCheckboxChange = (event) => {
    const villageId = event.target.value;
    if (event.target.checked) {
      setSelectedVillagesList([...selectedVillagesList, villageId]);
    } else {
      setSelectedVillagesList(
        selectedVillagesList.filter((id) => id !== villageId)
      );
    }
    console.log(selectedVillagesList)

  };

  const selectAllSelectedVillage = (e) =>{
    let arr = []
    if(e.target.checked)
    { 
      // setSelectedVillagesList([])
      console.log("hii",nmberOfAssignVill)
      
      nmberOfAssignVill.map((single)=>{
        arr.push(single.villageUniqueId)
      })
      setSelectedVillagesList([...arr])
   
      console.log(selectedVillagesList,"dum")
      
    }
    else
    {
      setSelectedVillagesList([])
      console.log(selectedVillagesList,"dum")
    }
  }
  return (
    <div>
  
    <Box>
    <TextField placeholder='Search' onChange={e=>setSearchValue(e.target.value)} style={{width:"270px"}}/>

      <Box boxShadow={2} style={{padding:"0",height:"300px",overflowY:"scroll"}}>
      <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
              <input
             
            type="checkbox"
            onChange={selectAllSelectedVillage}
          
          />
          
          <div style={{marginLeft:"10px"}}>SelectAll</div>
          </ListItemIcon>
          </ListItemButton>
        </List>
        <div>
        {
          nmberOfAssignVill?<div>
          {
            allfilteredDepartments.map((listOfVillage)=>{

              return(
            
                  
                    <List component="div" disablePadding>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                  <input
                                type="checkbox"
                                value={listOfVillage.villageUniqueId}
                                checked={selectedVillagesList.includes(listOfVillage.villageUniqueId)}
                                onChange={handleCheckboxChange}
                              />
                              
                              <div style={{marginLeft:"10px"}}>{listOfVillage.villageName}</div>
                              </ListItemIcon>
                              </ListItemButton>
                            </List>
                  
                  
                
             
              )
            })
          }
          </div>:<CircularProgress/>
        }
        
    </div></Box>
      </Box>
    </div>
  )
}

export default InnerComponent
