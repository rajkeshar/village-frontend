import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, TextField } from '@mui/material'
import React from 'react'
import _ from "lodash";
import { useDispatch } from 'react-redux';
import { getAllVilleges } from '../../Services/Apis/Api';


  

const SelectMultiSelectionDepartment = ({departmant,checkedDepartments,setCheckedDepartments,checkedSelectedDepartments,setCheckedSelectedDepartments,singleDistrict,allDepartmantData,nmberOfAssignDept}) => {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchSelectedTerm, setSelectedSearchTerm] = React.useState("");



  
    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };

    // React.useEffect(() => {
    //     console.log(checkedDepartments,"checkedDepartments")
    //     console.log(checkedSelectedDepartments,"checkedDepartments")

    
    // }, [checkedDepartments,checkedSelectedDepartments])
  
    const handleCheckboxChange = (event) => {
      console.log(event.target.value,"nmberOfAssignDept1")

      const departmentId = event.target.value;
      console.log("checkedSelectedDepartments",checkedSelectedDepartments)
      if (event.target.checked) {
        setCheckedSelectedDepartments([...checkedSelectedDepartments, departmentId]);
      } else {
        setCheckedSelectedDepartments(
          checkedSelectedDepartments.filter((id) => id !== departmentId)
        );
      }

    };
    const handleCheckboxChangeAgain = (event) => {
      const departmentId = event.target.value;
      console.log(event.target.value,"nmberOfAssignDept1")

      if (event.target.checked) {
        setCheckedDepartments([...checkedDepartments, departmentId]);
      } else {
        setCheckedDepartments(
          checkedDepartments.filter((id) => id !== departmentId)
        );
      }

    };
    const filteredDepartments = departmant.filter((department) =>
      department.deptName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(nmberOfAssignDept,"nmberOfAssignDept")

    const allfilteredDepartments = nmberOfAssignDept.filter((department) =>
    department.deptName.toLowerCase().includes(searchSelectedTerm.toLowerCase())
  );
   const Departmant = ({departmant,type})=>{
  
//     const [selectSingleVillage, setSelectSingleVillage] = React.useState(false)
  
      return(
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
                <input
              type="checkbox"
              value={type=="select"?departmant._id:departmant.deptId}
              checked={type=="select"?checkedDepartments.includes(departmant._id):checkedSelectedDepartments.includes(departmant.deptId)}
              onChange={type=="select"?handleCheckboxChangeAgain:handleCheckboxChange}
            />
             <div style={{marginLeft:"10px"}}>   {departmant.deptName}</div>
         </ListItemIcon>
         
    </ListItemButton>
      </List>)
   }


  return (
    <Box style={{display:"flex",gap:"20px"}}>
     
        <Box>
        <TextField placeholder='Search'         onChange={handleInputChange}
  style={{width:"270px"}}/>
  
          <Box boxShadow={2} style={{padding:"0",height:"300px",overflowY:"scroll"}}>
               {filteredDepartments.map((item) => {
                
              return( <div><Departmant departmant={item} type="select"/></div>)
              })}
          
          </Box>
          </Box>

          <Box>
          <TextField placeholder='Search' onChange={(e)=>setSelectedSearchTerm(e.target.value)}  style={{width:"270px"}}/>
    
            <Box boxShadow={2} style={{padding:"0",width:"270px",height:"300px",overflowY:"scroll"}}>
              
            {console.log(singleDistrict,"singleDistrict")}
            {allfilteredDepartments.map((dept)=>{
                // return(singleDistrict.AssignDepartments.departments.map((deptCheck)=>{
                //   console.log(dept._id , deptCheck)
                  return(
                    <div>{<Departmant departmant={dept} type="selected"/>}</div>
                  )
                })
              }
            </Box>
            </Box>
   
    </Box>

  )
}

export default SelectMultiSelectionDepartment
