import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addZone,editZone,addTaluka_new,editTaluka_again } from '../../Services/Apis/Api';
import { useParams } from 'react-router-dom';


export default function BlockModel({action,dispatch, getDistrict,setAction,singleDistrict,setOpenAlert}) {
  const [open, setOpen] = React.useState(false);
  const [block, setBlock] = React.useState("")
  const {zoneId,zoneName} = useParams()
 console.log(zoneId,zoneName,"zoneId")
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
console.log(singleDistrict)
    action.type=="edit"?setBlock(singleDistrict.taluka.talukaName):setBlock("")
   }, [singleDistrict,action])
   async function addScheme(){
        try{
          if(block !="")
          {
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
            var idVillage = `village${components.join("")}`

          
        var data = {talukaName:block,talukaUniqueId:singleDistrict?.taluka?.talukaUniqueId}
        const response =  action.type=="edit"?await dispatch(editTaluka_again({data:data,id:singleDistrict?.taluka?.talukaUniqueId})):await dispatch(addTaluka_new({talukaName:block,talukaUniqueId:id}))
        console.log(response)
        setOpenAlert({
            open:true,
            mssg:action.type=="edit"?"taluka edit successfully":"taluka add successfully",
            type:"success"
        })
        setAction({...action,open:false})
        getDistrict()
      }
      else
      {
        setOpenAlert({
          open:true,
          mssg:"enter taluka",
          type:"error"
      })
      }
        }
        catch(err)
        {
          console.log(err,"err")
            setOpenAlert({
                open:true,
                mssg:"Something Wrong",
                type:"error"
            })
        }

  }

  return (
    <div>
   
      <Dialog open={action.open} onClose={()=>closeDialog()}>
        <DialogTitle>      
             {action.type == "add"? "Add Taluka":"Edit Taluka"}
        </DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            label="Taluka Name"
            type="text"
            value={block}
            onChange={(e)=>setBlock(e.target.value)}
            fullWidth
            variant="outlined"
          />
       
          
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>closeDialog()}>Cancel</Button>
          <Button onClick={()=>addScheme()}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
