import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, TextField } from "@mui/material";
import React, { useState,useEffect } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { getAllVilleges,removeAssignmentOfVillege } from "../../Services/Apis/Api";

const DistrictVillagesList = ({ deselectedVillage,setDeselectedVillage,districts,singleDistrict,setSelectedVillages,selectedVillages }) => {
  const [open, setOpen] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState(districts);
  const [selectedVillage, setSelectedVillage] = React.useState([])
  // const [deselectedVillage, setDeselectedVillage] = React.useState([])
   const dispatch = useDispatch()
   useEffect(() => {

    dispatch(getAllVilleges()).then((listOfVilleges)=>{
      listOfVilleges.payload.data.map((listOfVillege)=>{
        singleDistrict.AssignVillage.villages.map((checkVillages)=>{
            if(checkVillages == listOfVillege.villageUniqueId )
            {
                
                  selectedVillage.push(listOfVillege)
            }

        })
      })
      setSelectedVillage(selectedVillage)

    })
  }, [])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const filter = _.filter(districts, (district) => {
        console.log(district,"district")
        return _.includes(
          _.lowerCase(district.taluka.talukaName),
          _.lowerCase(searchValue)
        );
      });
      
      setFilteredUsers(filter);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSelectAllVillages = (districtName, event) => {
    const updatedSelectedVillages = { ...selectedVillages };

    const districtVillages = districts.find(
      (district) => district.taluka.talukaName === districtName
    ).taluka.villages;
    console.log(districtVillages,"districtVillages")

    if (event.target.checked) {
      districtVillages.forEach((village) => {
        updatedSelectedVillages[
          `${village.villageUniqueId}`
        ] = true;
      });
    } else {
      districtVillages.forEach((village) => {
        updatedSelectedVillages[
          `${village.villageUniqueId}`
        ] = false;
      });
    }

    setSelectedVillages(updatedSelectedVillages);
  };


  const VillageData = ({village})=>{
    const handleVillageChange = (event) => {
        const updatedSelectedVillages = { ...selectedVillages };
    
        updatedSelectedVillages[event.target.value] = event.target.checked;
    
        setSelectedVillages(updatedSelectedVillages);
      };
    
    return(<List key={`${village.villageUniqueId}`} component="div" disablePadding>
    <ListItemButton sx={{ pl: 4 }}>
      <ListItemIcon>
      <input
      type="checkbox"
      value={`${village.villageUniqueId}`}
      checked={
        selectedVillages[
          `${village.villageUniqueId}`
        ] || false
      }
      onChange={handleVillageChange}
    />
   
  
      </ListItemIcon>
      <ListItemText primary={village.villageName} />
    </ListItemButton>
  </List>)
  }
  const selectAllDeselect =(e)=>{

  }
  const selectSelectedArrayForDeselect = (e,uniqueId)=>{
    console.log(uniqueId,"hii")
    if(e.target.checked)
    {
    deselectedVillage.push(uniqueId)
    setDeselectedVillage([...deselectedVillage])
    }
    else
    {
      let finalFilter = deselectedVillage.filter((checkData)=>{
        return checkData != uniqueId
      })
      setDeselectedVillage([...finalFilter])
    }

    console.log(deselectedVillage,e.target.checked,"jklll")
  }

  return (
    <Box style={{display:"flex",overflow:"hidden"}}>
    <Box sx={{height:"400px", width:"65%",overflow:"scroll",overflowX:"hidden",boxShadow:"1"}}>
    <List
    sx={{ width: '280px', maxWidth: 300, bgcolor: 'background.paper' }}
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
      <ListSubheader component="h3" id="nested-list-subheader">
      District Villages List
      </ListSubheader>
    }
  >
    <TextField placeholder="Search"  value={searchValue}
    onChange={(e)=>setSearchValue(e.target.value)}/>
      {_.map(filteredUsers,(district) => (
    <div key={district.taluka.talukaName}>
        <ListItemButton >

        <ListItemIcon>
        <input
          type="checkbox"
        
          onChange={(event) =>
            handleSelectAllVillages(district.taluka.talukaName, event)
          }
        />
        </ListItemIcon>
        <ListItemText primary={district.taluka.talukaName} />
        
      </ListItemButton>
         
      <Collapse in={open} timeout="auto" unmountOnExit>
          {district.taluka.villages.map((village) => (
        <VillageData village={village}/>
          ))}
        </Collapse>
        </div>

      ))}
      
      </List>
      </Box>
      <Box  sx={{height:"400px",overflow:"scroll",overflowX:"hidden",boxShadow:"1"}}>
      <List
      sx={{ width: '300px', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="h3" id="nested-list-subheader">
        Selected Villages List
        </ListSubheader>
      }
    >
 
        {selectedVillage?selectedVillage.map((village) => {

            return(
            <List  key={village.villageUniqueId} style={{width:"200px"}}> 
            <ListItemButton> <ListItemIcon>
            <input
              type="checkbox"
              style={{marginRight:"10px"}}
              onChange={(e)=>selectSelectedArrayForDeselect(e,village.villageUniqueId)}
             
            />
            {village.villageName}
            </ListItemIcon> </ListItemButton></List>
          )}):""}
      </List>
      </Box>
    </Box>
  );
};

export default DistrictVillagesList;
