import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { useDispatch } from 'react-redux';
import { getTalukaList } from '../../Services/Apis/Api';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@material-ui/core';

export default function SelecSelectedMultiSelectionBox({checkedVillageArray}) {
  const [checked, setChecked] = React.useState([0]);
  const [taluka, setTaluka] = React.useState([])
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  React.useEffect(() => {
      dispatch(getTalukaList()).then((res)=>{
        console.log(res.payload.data)
        setTaluka(res.payload.data)
      })
  }, [])

  return (
   <div style={{height:"400px",overflow:"scroll",overflowX:"hidden"}}>
   {console.log(checkedVillageArray,"checkedVillageArray")}
    {checkedVillageArray.map((data)=>{
      console.log(data,"data")
      return( <div
      >
           {data}
        </div>)
        
    })}

    
    </div>
  );
}
