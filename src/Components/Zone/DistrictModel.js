import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addZone,editZone } from '../../Services/Apis/Api';
import { useParams } from 'react-router-dom';

export default function DistrictModel({action,dispatch,getDistrict,setAction,singleDistrict,setOpenAlert}) {
  const [open, setOpen] = React.useState(false);
  const [district, setDistrict] = React.useState({
    districtName:"",
    pincode:""
  })
  const {departmentId,departmentName} = useParams()
 console.log(departmentId,departmentName,"departmentId")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeDialog = ()=>{
    setAction({...action,open:false})
    setDistrict("")
  }

   React.useEffect(() => {
    action.type=="edit"?setDistrict(singleDistrict):setDistrict("")
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
            
            var id = `district${components.join("")}`
          
        var data = {districtName:district.districtName,pincode:district.pincode}
        const response =  action.type=="edit"?await dispatch(editZone({data:data,id:district._id})):await dispatch(addZone(district))
        console.log(response)
        setOpenAlert({
            open:true,
            mssg:action.type=="edit"?"district edit successfully":"district add successfully",
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
             {action.type == "add"? "Add District":"Edit District"}
        </DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            label="District Name"
            type="text"
            value={district.districtName}
            onChange={(e)=>setDistrict({...district,districtName: e.target.value})}
            fullWidth
            variant="outlined"
          />
          <TextField
          autoFocus
          margin="dense"
          label="District Pincode"
          type="text"
          value={district.pincode}
          onChange={(e)=>setDistrict({...district,pincode: e.target.value})}
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
