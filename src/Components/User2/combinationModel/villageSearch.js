import React, { useEffect,useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { getTalukaList,addAssignmentOfVillege,departmantList,selectedVillageOfListData, removeAssignmentOfVillege } from "../../../Services/Apis/Api";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DeselectVillage from "./DeselectVillage";

const VillageListData = ({talukaData,search,setVillageDataThatSelected,villageDataThatSelected,villageList,selectedTaluka,setSelectedTaluka,setSelectedVillages,selectedVillages})=>{

 
   


    return(
        <Accordion>
        <div style={{display:"flex",marginLeft:"20px"}}>
        <input  type="checkbox" value={talukaData.talukaUniqueId} checked={selectedTaluka.includes(talukaData.talukaUniqueId)} onChange={(e)=>{
            if(e.target.checked)
            {
                selectedTaluka.push(talukaData.talukaUniqueId)
                setSelectedTaluka([...selectedTaluka])
                talukaData.villages.map((val)=>{
                    selectedVillages.push(val.villageUniqueId)
                    const uniqueArrayOfVillage = Array.from(new Set(selectedVillages.map(item => item))).map(villageId => {
                      return selectedVillages.find(item => item === villageId);
                    })
                    setSelectedVillages([...uniqueArrayOfVillage])
                    villageDataThatSelected.push({villageId:val.villageUniqueId,villageName:val.villageName})
                    const uniqueArrayOfVillage2 = Array.from(new Set(villageDataThatSelected.map(item => item.villageId))).map(villageId => {
                      return villageDataThatSelected.find(item => item.villageId === villageId);
                    })
                    setVillageDataThatSelected([...uniqueArrayOfVillage2])
                })
            }
            else
            {
                let sel = selectedTaluka.filter((rmv)=>{
                    return rmv !=talukaData.talukaUniqueId
                })
                setSelectedTaluka([...sel])

                talukaData.villages.map((villageDataSet)=>{
                    let aj = selectedVillages.map((id)=>
                    {
                      if(villageDataSet.villageUniqueId == id)
                      {

                   
                    let index = selectedVillages.indexOf(villageDataSet.villageUniqueId)
                    let dummy = selectedVillages[index]
                    selectedVillages[index] =  selectedVillages[selectedVillages.length - 1]
                    selectedVillages[selectedVillages.length - 1] = dummy
                    selectedVillages.pop()
                    setSelectedVillages([...selectedVillages])

                    let index2 = villageDataThatSelected.findIndex(obj => obj.villageId === villageDataSet.villageUniqueId)
                    let dummy2 = villageDataThatSelected[index2]
                    villageDataThatSelected[index2] = villageDataThatSelected[villageDataThatSelected.length - 1]
                    villageDataThatSelected[villageDataThatSelected.length - 1] = dummy2
                    villageDataThatSelected.pop()
                    setVillageDataThatSelected([...villageDataThatSelected])
                      }
                    })})
                
            }
      }}/>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{width:"100%"}}
        >
          <Typography>
         {talukaData.talukaName}</Typography>
        </AccordionSummary>
        </div>
        <AccordionDetails>
          <Typography>
                {talukaData?talukaData.villages?talukaData.villages.map((data)=>{

                    return (<div style={{padding:"10px"}}><input type="checkbox" value={data.villageUniqueId} checked={selectedVillages.includes(data.villageUniqueId)}  onChange={(e)=>{
                         if(e.target.checked)
                         {
                                selectedVillages.push(e.target.value)
                                setSelectedVillages([...selectedVillages])
                                villageDataThatSelected.push({villageId:e.target.value,villageName:data.villageName})
                                setVillageDataThatSelected([...villageDataThatSelected])
                         }
                         else
                         {
                               let newOne = selectedVillages.filter((id)=>{
                                return id != e.target.value
                               }) 
                               setSelectedVillages([...newOne])
                               
                               let newOneAgain = villageDataThatSelected.filter((val)=>{
                                  return val.villageId != e.target.value
                               })
                               setVillageDataThatSelected([...newOneAgain])


                         }
                    }}/>{data.villageName}</div>)
                }):"":""}
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
}

const VillageSearch = ({
    openCombinationDialog,
  singleUser,villageDataThatSelected,
  setVillageDataThatSelected,selectedVillages,setSelectedVillages
}) => {

const [villageList, setVillageList]= useState([])

// const [selectedVillages, setSelectedVillages]= useState([])
const [selectedTaluka, setSelectedTaluka]= useState([])
const [deselectListOfSelectedVillage, setDeselectListOfSelectedVillage]= useState([])

const [selectedVillagesList,setSelectedVillagesList] = useState([])



const [search, setSearch]= useState("")

const dispatch = useDispatch()

    

useEffect(()=>{
   apiCallOfVillageListWithTaluka()
},[])



useEffect(()=>{
     console.log(selectedVillages)
 },[selectedVillages])


// function assignVillage()
// {
//     dispatch(
//         addAssignmentOfVillege({ id: singleUser._id, data: selectedVillages })
//       ).then((res)=>{
//         console.log(res)
//     apiCallSelectedVillage()
//      setDeselectListOfSelectedVillage([])
//      setSelectedTaluka([])
//      setSelectedVillages([])

//       })
// }

// function removeVillage()
// {
//     dispatch(
//         removeAssignmentOfVillege({ id: singleUser._id, data: deselectListOfSelectedVillage })
//       ).then((res)=>{
//         console.log(res)
//     apiCallSelectedVillage()
//     setDeselectListOfSelectedVillage([])
//     setSelectedTaluka([])
//     setSelectedVillages([])

//       })
// }


function apiCallOfVillageListWithTaluka()
{
  dispatch(getTalukaList()).then((res)=>{
      console.log(res.payload.data)
      setVillageList(res.payload.data)
      
  })
}

// function apiCallSelectedVillage()
// {
//   dispatch(selectedVillageOfListData(singleUser._id)).then((res)=>{
//       console.log(res.payload.data,"akk")
//       setSelectedVillagesList(res.payload.data)
//   })
// }



const filterVilleges = villageList.filter((taluka,index) =>
{
    console.log(taluka)
     return taluka.taluka.talukaName?taluka.taluka.talukaName.toLowerCase().includes(search.toLowerCase()):""
      
})


  return (
   <div>
      


        <Box style={{ display: "flex", gap: "20px" }}>

          <Box>
            <TextField placeholder="Search" onChange={(e)=>setSearch(e.target.value)} style={{ width: "370px" }} />

            <Box
              boxShadow={2}
              style={{ padding: "0", height: "300px", overflowY: "scroll" }}
            >
                {filterVilleges.map((talukaData)=>{
                    return <VillageListData villageDataThatSelected={villageDataThatSelected} setVillageDataThatSelected={setVillageDataThatSelected} talukaData={talukaData.taluka} villageList={villageList} selectedVillages={selectedVillages} setSelectedVillages={setSelectedVillages} selectedTaluka={selectedTaluka} setSelectedTaluka={setSelectedTaluka} search={search}/>
                })}
                
            
            </Box>
          </Box>
        </Box>
        </div>

  );
};

export default VillageSearch;
