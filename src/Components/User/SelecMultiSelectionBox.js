import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, TextField } from '@mui/material'
import React from 'react'
import _ from "lodash";
import { useDispatch } from 'react-redux';
import { getAllVilleges } from '../../Services/Apis/Api';


const SelecMultiSelectionBox = ({data,reload,mutiId,setMultiId,mutiId2,setMultiId2,singleDistrict}) => {
  console.log(data)
  const dispatch = useDispatch()
 

  const [searchValue, setSearchValue] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState(data);
  const [talukaId, setTalukaId] = React.useState([])
  const [selectedVillage, setSelectedVillage] = React.useState([])
  const [isSearch, setIsSearch] = React.useState(true)
  const filterVilleges = data.filter((department) =>
      department.taluka.talukaName.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleCheckboxChangeAgain = (event,index,array) => {
      const departmentId = event.target.value;
      if (event.target.checked) {
        setTalukaId([...talukaId, departmentId]);
        console.log(array,"array")
        let fullData = array[index].taluka.villages
        fullData.map((villageDataSet)=>{
          mutiId.push(villageDataSet.villageUniqueId)
        })
        setMultiId(mutiId)  
      } else {
        setTalukaId(
          talukaId.filter((id) => id !== departmentId)
        );
        let fullData = array[index].taluka.villages
        fullData.map((villageDataSet)=>{
            let aj = mutiId.map((id)=>
            {
              if(villageDataSet.villageUniqueId == id)
              {
            let index = mutiId.indexOf(villageDataSet.villageUniqueId)
            let dummy = mutiId[index]
            mutiId[index] =  mutiId[mutiId.length - 1]
            mutiId[mutiId.length - 1] = dummy
            mutiId.pop()
            setMultiId(mutiId)
              }
            }  )
          
              
        })
        console.log(departmentId) 
        // setMultiId()
     console.log(mutiId,"jkl")

      }
     console.log(mutiId,"jkl")
    };
    const selectVillegeOrNot = (event)=>{
      const departmentId = event.target.value;
      if (event.target.checked) {
        setMultiId([...mutiId, departmentId]);
      } else {
        setMultiId(
          mutiId.filter((id) => id !== departmentId)
        );
      }

      console.log(mutiId,"mutiId")
    }
  React.useEffect(() => {

    dispatch(getAllVilleges()).then((listOfVilleges)=>{
      listOfVilleges.payload.data.map((listOfVillege)=>{
        singleDistrict.AssignVillage.villages.map((checkVillages)=>{
            if(checkVillages == listOfVillege.villageUniqueId )
            {
                
                  selectedVillage.push(listOfVillege)
                  setSelectedVillage(selectedVillage)
            }

        })
      })
      setSelectedVillage(selectedVillage)

    })
  }, [reload])
  const VillageListOuter = ({village})=>{
  
    const [selectSingleVillage, setSelectSingleVillage] = React.useState(false)
  
     
    
      

      return(
      <List component="div" disablePadding>
        
          <ListItemIcon>
              <input checked={selectSingleVillage}  type="checkbox" onChange={selectVillegeOrNot}/>
              <div style={{marginLeft:"10px"}}>{village.villageName}</div>
          </ListItemIcon>
     
      </List>)
    }
  React.useEffect(() => {
    
    const timeout = setTimeout(() => {
      const filter = _.filter(data, (district) => {
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
  const DistrictList = ({item,index,array})=>{
    const [open, setOpen] = React.useState(true);
    const [selectAllVillage, setSelectedVillage] = React.useState(false)
     
   
    const handleClick = () => {
      setOpen(!open);
    };
    
    const VillageList = ({village})=>{
    const [selectSingleVillage, setSelectSingleVillage] = React.useState(selectAllVillage)
      // React.useEffect(() => {
      // if(selectAllVillage)
      // {   
      //     mutiId.push(village.villageUniqueId)
      //     setMultiId(mutiId)
      //     console.log(mutiId)
      // }
      // else
      // {
      //   if(mutiId.length != 0)
      //   {
      //     let index = mutiId.indexOf(village.villageUniqueId)
      //     let length = mutiId.length

      //     let temp = mutiId[index]
      //     mutiId[index] = mutiId[length-1]
      //     mutiId[length-1] = temp
      //     mutiId.pop()

      //     setMultiId(mutiId)
      //     console.log(mutiId)
      //   }
      // }
     
   
      
      // }, [])
     
    
      


      return(<Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
              <input value={village.villageUniqueId} checked={mutiId.includes(village.villageUniqueId)}  type="checkbox" onChange={selectVillegeOrNot}/>
              <div style={{marginLeft:"10px"}}>{village.villageName}</div>
          </ListItemIcon>
         
        </ListItemButton>
      </List>
    </Collapse>)
    }
    return( <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    
    >
   
      <ListItemButton>
        <ListItemIcon>
          <input type="checkbox" value={item.taluka.talukaUniqueId} checked={talukaId.includes(item.taluka.talukaUniqueId)} onChange={(e)=>handleCheckboxChangeAgain(e,index,array)}/>
          
        </ListItemIcon>
        <ListItemText style={{padding:"0",margin:"0",marginLeft:"-25px"}}>{item.taluka.talukaName}</ListItemText>
        {open ? <ExpandLess  onClick={handleClick}/> : <ExpandMore  onClick={handleClick}/>}
      </ListItemButton>
    
      {
        item.taluka.villages.map((village)=>{
          return <VillageList village={village}/>
        })
      }
    </List>)
  }
  return (
    <Box style={{display:"flex",gap:"20px"}}>
      <Box>
      <TextField placeholder='Search' onChange={(e)=>setSearchValue(e.target.value)}  style={{width:"270px"}}/>

        <Box boxShadow={2} style={{padding:"0",width:"270px",height:"300px",overflowY:"scroll"}}>
            {filterVilleges.map((item,index,array)=>{
              
              // let isSelected = false
              // talukaId.map((data)=>{
              //   if(item.taluka.talukaUniqueId == data )
              //   {
              //     isSelected = true
              //   }
              // })
            return(
              <div><DistrictList  item={item} index={index} array={array}/></div>
            )
            })}
        
        </Box>
        </Box>
       
   
    </Box>
  )
}

export default SelecMultiSelectionBox
