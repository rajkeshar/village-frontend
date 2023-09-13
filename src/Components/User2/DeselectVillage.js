import React,{useState} from 'react'
import { Box,TextField } from '@mui/material'

const DeselectVillage = ({selectedVillagesList,deselectListOfSelectedVillage,setDeselectListOfSelectedVillage,setSelectedVillagesList}) => {
    const [search, setSearch] = useState("")
    // console.log(selectedVillagesList.length,"selectedVillagesList")
    const filterVilleges = selectedVillagesList?selectedVillagesList.filter((vill,index) =>
    {
         return vill.villageName.toLowerCase().includes(search.toLowerCase())
          
    }):[]
    
  return (
    <div>   
    <Box style={{ display: "flex", gap: "20px" }}>

          <Box>
            <TextField placeholder="Search" onChange={(e)=>setSearch(e.target.value)} style={{ width: "270px" }} />

            <Box
              boxShadow={2}
              style={{ padding: "0", height: "300px", overflowY: "scroll" }}
            >
                <div style={{padding:"10px"}}><input style={{marginRight:"10px"}}  onChange={(e)=>{
                    if(e.target.checked)
                    {
                        selectedVillagesList.map((vill)=>{
                            deselectListOfSelectedVillage.push(vill.villageUniqueId)
                            setDeselectListOfSelectedVillage([...deselectListOfSelectedVillage])
                        }) 
                    }
                    else
                    {

                        setDeselectListOfSelectedVillage([])
                        
                    

                    }
                }} type='checkbox'/>Select  All</div>

                {filterVilleges.map((village)=>{
                    return(
                        <Box style={{padding:"10px"}}>
                        <input style={{marginRight:"10px"}} value={village.villageUniqueId}  checked={deselectListOfSelectedVillage.includes(village.villageUniqueId)}  onChange={(e)=>{
                            if(e.target.checked)
                            {
                                deselectListOfSelectedVillage.push(village.villageUniqueId)
                                setDeselectListOfSelectedVillage([...deselectListOfSelectedVillage])
                            }
                            else{

                              let final =   deselectListOfSelectedVillage.filter((ids)=>{
                                    return village.villageUniqueId !=ids
                                })
                                setDeselectListOfSelectedVillage([...final])

                            }
                        }} type='checkbox'/>
                            {village.villageName}
                        </Box>
                    )
                })}
            </Box>
            </Box>
    </Box>
      
    </div>
  )
}

export default DeselectVillage
