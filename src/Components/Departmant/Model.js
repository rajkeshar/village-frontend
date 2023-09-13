import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addDepartment,editDepartmant } from '../../Services/Apis/Api';

export default function Model({action,dispatch,getDepartmentList,setAction,singleDepartmantInformation,setOpenAlert}) {
  const [open, setOpen] = React.useState(false);
  const [department, setDepartmant] = React.useState("")
 console.log(singleDepartmantInformation.deptName)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeDialog = ()=>{
    setAction({...action,open:false})
    setDepartmant("")
  }

   React.useEffect(() => {
    action.type=="edit"?setDepartmant(singleDepartmantInformation.deptName):setDepartmant("")
   }, [singleDepartmantInformation,action])
   async function addDepartmantData(){
        try{
        const response =  action.type=="edit"?await dispatch(editDepartmant({data:{deptName:department},id:singleDepartmantInformation._id})):await dispatch(addDepartment({deptName:department}))
        console.log(response)
        setOpenAlert({
            open:true,
            mssg:action.type=="edit"?"Departmant edit successfully":"Departmant add successfully",
            type:"success"
        })
        setAction({...action,open:false})
        getDepartmentList()
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
             {action.type == "add"? "Add Departmant":"Edit Departmant"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Departmant Name"
            type="text"
            value={department}
            onChange={(e)=>setDepartmant(e.target.value)}
            fullWidth
            variant="outlined"
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>closeDialog()}>Cancel</Button>
          <Button onClick={()=>addDepartmantData()}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
