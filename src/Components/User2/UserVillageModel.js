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
import { getTalukaList,addAssignmentOfVillege,departmantList,selectedVillageOfListData, removeAssignmentOfVillege } from "../../Services/Apis/Api";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeselectVillage from "./DeselectVillage";

const VillageListData = ({talukaData,search,villageList,selectedTaluka,setSelectedTaluka,setSelectedVillages,selectedVillages})=>{

 
   


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
                    setSelectedVillages([...selectedVillages])
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
                    setSelectedVillages(selectedVillages)
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
                         }
                         else
                         {
                               let newOne = selectedVillages.filter((id)=>{
                                return id != e.target.value
                               }) 
                               setSelectedVillages([...newOne])

                         }
                    }}/>{data.villageName}</div>)
                }):"":""}
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
}

const UserVillageModel = ({
  dialogOpenForVillage,
  setDialogOpenForVillage,
  singleUser
}) => {

const [villageList, setVillageList]= useState([])
const [villageListUpdated, setVillageListUpdated]= useState([])

const [selectedVillages, setSelectedVillages]= useState([])
const [selectedTaluka, setSelectedTaluka]= useState([])
const [deselectListOfSelectedVillage, setDeselectListOfSelectedVillage]= useState([])

const [selectedVillagesList,setSelectedVillagesList] = useState([])



const [search, setSearch]= useState("")

const dispatch = useDispatch()

    

useEffect(()=>{
   apiCallOfVillageListWithTaluka()
},[])

useEffect(()=>{
    apiCallSelectedVillage()

},[dialogOpenForVillage])

useEffect(()=>{
     console.log(selectedVillages)
 },[selectedVillages])


function assignVillage()
{
    dispatch(
        addAssignmentOfVillege({ id: singleUser._id, data: selectedVillages })
      ).then((res)=>{
        console.log(res)
    apiCallSelectedVillage()
     setDeselectListOfSelectedVillage([])
     setSelectedTaluka([])
     setSelectedVillages([])

      })
}

function removeVillage()
{
    dispatch(
        removeAssignmentOfVillege({ id: singleUser._id, data: deselectListOfSelectedVillage })
      ).then((res)=>{
        console.log(res)
    apiCallSelectedVillage()
    setDeselectListOfSelectedVillage([])
    setSelectedTaluka([])
    setSelectedVillages([])

      })
}


function apiCallOfVillageListWithTaluka()
{
  dispatch(getTalukaList()).then((res)=>{
      console.log(res.payload.data)
      setVillageList(res.payload.data)
      
  })
}

function apiCallSelectedVillage()
{
  dispatch(selectedVillageOfListData(singleUser._id)).then((res)=>{
      console.log(res.payload.data,"akk")
      setSelectedVillagesList(res.payload.data)
  })
}



const filterVilleges = villageList.filter((taluka,index) =>
{
    console.log(taluka)
     return taluka.taluka.talukaName?taluka.taluka.talukaName.toLowerCase().includes(search.toLowerCase()):""
      
})


  return (
    <Dialog
      open={dialogOpenForVillage}
      onClose={() => {
        setDialogOpenForVillage(false);
        setDeselectListOfSelectedVillage([])
     setSelectedVillages([])
     setSelectedTaluka([])
      }}
    >
      <DialogTitle></DialogTitle>
      <DialogContent>
      <Box >  
      
        <Typography variant="div" style={{marginRight:"120px"}}> Select Villege for Assign</Typography>       <Typography variant="div"> Select Villege  for Remove</Typography></Box>


        <Box style={{ display: "flex", gap: "20px" }}>

          <Box>
            <TextField placeholder="Search" onChange={(e)=>setSearch(e.target.value)} style={{ width: "270px" }} />

            <Box
              boxShadow={2}
              style={{ padding: "0", height: "300px", overflowY: "scroll" }}
            >
                {filterVilleges.map((talukaData)=>{
                    return <VillageListData talukaData={talukaData.taluka} villageList={villageList} selectedVillages={selectedVillages} setSelectedVillages={setSelectedVillages} selectedTaluka={selectedTaluka} setSelectedTaluka={setSelectedTaluka} search={search}/>
                })}
                
            
            </Box>
          </Box>

          <Box>
                <DeselectVillage  deselectListOfSelectedVillage={deselectListOfSelectedVillage} setDeselectListOfSelectedVillage={setDeselectListOfSelectedVillage} setSelectedVillagesList={setSelectedVillagesList} selectedVillagesList={selectedVillagesList}/>
          </Box>
        </Box>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={assignVillage} disabled={selectedVillages.length==0}>Assign</Button>
        <Button onClick={removeVillage} disabled={deselectListOfSelectedVillage.length==0}>Remove</Button>
        <Button onClick={()=>
            {
                setDialogOpenForVillage(false)
                setDeselectListOfSelectedVillage([])
                setSelectedVillages([])
                setSelectedTaluka([])
            
        }}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserVillageModel;
