import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertMssg({action,setAction}) {
 

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
    
      <Snackbar open={action.open} autoHideDuration={6000} onClose={()=>setAction({...action,open:false})}>
        <Alert onClose={()=>setAction({...action,open:false})} severity={action.type} sx={{ width: '100%' }}>
         {action.mssg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
