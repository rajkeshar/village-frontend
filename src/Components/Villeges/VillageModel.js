import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addVillage,editZone,editTaluka,addTaluka } from '../../Services/Apis/Api';
import { useParams } from 'react-router-dom';

export default function VillageModel({blockData,action,dispatch,taluka,getDistrict,setAction,singleDistrict,setOpenAlert}) {
  const [open, setOpen] = React.useState(false);
  const [block, setBlock] = React.useState("")
  const {zoneId,districtName,blockUniqueId,} = useParams()
 console.log(zoneId,"zoneId")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeDialog = ()=>{
    setAction({...action,open:false})
    setBlock("")
  }

   React.useEffect(() => {

    action.type=="edit"?setBlock(singleDistrict.villageName):setBlock("")
   }, [singleDistrict,action])
   async function addScheme(){
        try{
            var date = new Date();
            var components = [
                date.getYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
                date.getMilliseconds()
            ];
            
            var id = `village${components.join("")}`
          
        var data = {districtName:districtName,blockName:blockData.blockName,blockUniqueId:blockUniqueId,villageUniqueId:singleDistrict.villageUniqueId,talukaUniqueId:taluka.talukaUniqueId,talukaName:taluka.talukaName,villageName:block,villageUniqueId:singleDistrict.villageUniqueId}
        const response =  action.type=="edit"?await dispatch(editZone({data:data,id:zoneId})):await dispatch(addVillage({zoneId:zoneId,data:{villageName:block,villageUniqueId:id,talukaUniqueId:taluka.talukaUniqueId,blockUniqueId:blockUniqueId}}))
        console.log(response)
        setOpenAlert({
            open:true,
            mssg:action.type=="edit"?"Village edit successfully":"Village add successfully",
            type:"success"
        })
        setAction({...action,open:false})
        getDistrict()
        }
        catch(err)
        {
            setOpenAlert({
                open:true,
                mssg:"Something Wrong",
                type:"Error"
            })
        }

  }

  const updateData = ()=>{
    
  }

  async function addSchemeForTaluka(){
    try{
        var date = new Date();
        var components = [
            date.getYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        ];
        
        var id = `taluka${components.join("")}`
      
    var data = {blockUniqueId:blockUniqueId,villageUniqueId:singleDistrict.villageUniqueId,villageName:block}
    const response =  action.type=="edit"?await dispatch(editZone({data:data,id:zoneId,blockUniqueId:blockUniqueId,villageUniqueId:singleDistrict._id})):await dispatch(addTaluka({zoneId:zoneId,data:{talukaName:block,talukaUniqueId:id,blockUniqueId:blockUniqueId}}))
    console.log(response)
    setOpenAlert({
        open:true,
        mssg:action.type=="edit"?"Village edit successfully":"Village add successfully",
        type:"success"
    })
    setAction({...action,open:false})
    getDistrict()
    }
    catch(err)
    {
        setOpenAlert({
            open:true,
            mssg:"Something Wrong",
            type:"Error"
        })
    }

}

async function editTalukaData()
{
  try{
  var data = {blockUniqueId:blockUniqueId,talukaName:block}

  let res = await dispatch(editTaluka({data:data,id:zoneId}))
  if(res)
  {
  setOpenAlert({
    open:true,
    mssg:"taluka edit successfully",
    type:"success"
})
setAction({...action,open:false})
getDistrict()
    }
  }
  catch(err)
  {
    console.log(err)
    setOpenAlert({
      open:true,
      mssg:"error",
      type:"success"
    })
  }
}

  return (
    <div>
      <Dialog open={action.open} onClose={()=>closeDialog()}>
        <DialogTitle>      
             {action.for != "taluka"?action.type == "add"? "Add Village":"Edit Village":"Add Taluka"}
             
        </DialogTitle>
        <DialogContent>
        {action.for != "taluka"?
          <TextField
            autoFocus
            margin="dense"
            label={action.for != "taluka"?"Village Name":"Taluka Name"}
            type="text"
            value={block}
            onChange={(e)=>setBlock(e.target.value)}
            fullWidth
            variant="outlined"
          />:    <TextField
          autoFocus
          margin="dense"
          label="Taluka Name"
          type="text"
          value={block}
          onChange={(e)=>setBlock(e.target.value)}
          fullWidth
          variant="outlined"
        />}
       
          
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>closeDialog()}>Cancel</Button>
          {action.for != "taluka"?<Button onClick={()=>addScheme()}>Add</Button>:action.type != "edit"?<Button onClick={()=>addSchemeForTaluka()}>Add</Button>:<Button onClick={()=>editTalukaData()}>Edit</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
