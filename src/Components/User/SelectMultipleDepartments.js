import React, { useState,useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getAllVilleges,departmantList } from "../../Services/Apis/Api";

import { MenuProps, useStyles, options } from "./utils";
import { useDispatch } from "react-redux";
// import { dispatch } from "d3";

function SelectMultipleDepartments({departmant,allDepartmantData,setAllDepartmantData, setDepartmant,selected, setSelected}) {
  const classes = useStyles();
  
  const isAllSelected = departmant.length > 0 && selected.length === departmant.length;
    let dispatch = useDispatch()

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === departmant.length ? [] : departmant)
      return;
    }
    setSelected(value);
  };
async function  getVillegesData()
{
    let res = await dispatch(departmantList())
    setAllDepartmantData(res.payload.data)
    setDepartmant(res.payload.data.map((res)=>{
        return res.deptName
      }))
}
  useEffect(() => {
    getVillegesData()
  }, [])

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="mutiple-select-label">Multiple Select</InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        value={selected}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        <MenuItem
          value="all"
          classes={{
            root: isAllSelected ? classes.selectedAll : ""
          }}
        >
          <ListItemIcon>
            <Checkbox
              classes={{ indeterminate: classes.indeterminateColor }}
              checked={isAllSelected}
              indeterminate={
                selected.length > 0 && selected.length < departmant.length
              }
            />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.selectAllText }}
            primary="Select All"
          />
        </MenuItem>
        {departmant.map((option,index) => (
          <MenuItem key={option} value={option}>
            <ListItemIcon>
              <Checkbox checked={selected.indexOf(option) > -1} />
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectMultipleDepartments;