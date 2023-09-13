import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addVillage,editZone,addTaluka,addTaluka_new } from '../../Services/Apis/Api';
import { useParams } from 'react-router-dom';

export default function TalukaModel({action,dispatch,getDistrict,setAction,singleDistrict,setOpenAlert}) {
  const [open, setOpen] = React.useState(false);
  const [block, setBlock] = React.useState("")
  const {zoneId,blockUniqueId} = useParams()
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
            
            var id = `taluka${components.join("")}`
          
        var data = {blockUniqueId:blockUniqueId,villageUniqueId:singleDistrict.villageUniqueId,villageName:block}
        const response =  action.type=="edit"?await dispatch(editZone({data:data,id:zoneId})):await dispatch(addTaluka({zoneId:zoneId,data:{talukaName:block,talukaUniqueId:id,blockUniqueId:blockUniqueId}}))
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

  return (
    <div>
      <Dialog open={action.open} onClose={()=>closeDialog()}>
        <DialogTitle>      
             {action.type == "add"? "Add taluka":"Edit taluka"}
        </DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            label="taluka Name"
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
