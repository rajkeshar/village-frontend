import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addDepartment,editDepartmant } from '../../Services/Apis/Api';
import { useParams } from 'react-router-dom';

export default function SchemeModel({action,dispatch,getDepartmentList,setAction,singleDepartmantInformation,setOpenAlert}) {
  const [open, setOpen] = React.useState(false);
  const [scheme, setScheme] = React.useState("")
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
    setScheme("")
  }

   React.useEffect(() => {
    action.type=="edit"?setScheme(singleDepartmantInformation.schemeName):setScheme("")
   }, [singleDepartmantInformation,action])
   async function addScheme(){
        try{
          if(scheme)
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
            
            var id = `Scheme${components.join("")}`
          
        var data = {schemeId:singleDepartmantInformation.schemeId,schemeName:scheme}
        const response =  action.type=="edit"?await dispatch(editDepartmant({data:data,id:departmentId})):await dispatch(addDepartment({schemeName:scheme,schemeId:id,deptName:departmentName,deptId:departmentId}))
        console.log(response)
        setOpenAlert({
            open:true,
            mssg:action.type=="edit"?"Scheme edit successfully":"Scheme add successfully",
            type:"success"
        })
        setAction({...action,open:false})
        getDepartmentList()
        }
      
      else{
        setOpenAlert({
          open:true,
          mssg:"Schema is required",
          type:"error"
      })
      }
    }
        catch(err)
        {
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
             {action.type == "add"? "Add scheme":"Edit scheme"}
        </DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Scheme Name"
            type="text"
            value={scheme}
            onChange={(e)=>setScheme(e.target.value)}
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
