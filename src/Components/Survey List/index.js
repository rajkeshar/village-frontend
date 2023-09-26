import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import ErrorIcon from '@mui/icons-material/Error';
import { Button, FormControl, Input, InputLabel, MenuItem, Pagination, TextField } from '@mui/material';
import { survayRank ,getAllVilleges, survayRankByDept,questionListFilter, departmantList,surveyList} from '../../Services/Apis/Api';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { MultiSelect } from "react-multi-select-component";
import { useEffect } from 'react';
import {CChart} from "@coreui/react-chartjs"
import Select from "react-select";
import { DataGrid } from '@mui/x-data-grid';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver'


function createData(rank,name, calories, fat, carbs, protein, price) {
  return {
    rank,
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: 'स्वच्छता विभाग',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}



function Row(props) {
  const { row,setQuestionFilter,setTabs } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
    
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
         <TableCell component="th" scope="row">
          {row.rank}
        </TableCell>
        <TableCell>

          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ?<IndeterminateCheckBoxIcon/>: <AddBoxIcon/>}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.villageName}
        </TableCell>
        <TableCell >All</TableCell>
        <TableCell >{row.deptTotalScore}</TableCell>
        <TableCell >All</TableCell>
        <TableCell ></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 ,margin:0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box >
              <Table  aria-label="purchases">
                <TableBody>
                  {row.departmants.map((historyRow,index) => {
                      return (
                          <TableRow key={index}>
                          <TableCell></TableCell>
                              <TableCell style={{width:"630px"}}></TableCell>
                             

                              <TableCell style={{width:"290px"}}><div style={{ display:"flex",justifyContent:"flex-start",alignItems:"center",gap:"5px", fontSize:"15px"}}><ErrorIcon onClick={()=>{
                                setQuestionFilter({
                                  villageUniqueId:row.villageUniqueId,
                                  surveyId:row.surveyId,
                                  deptId:historyRow.deptId
                                })
                                setTabs(2)
                              }} /> {historyRow.deptName}</div></TableCell>
                              <TableCell >
                                 {historyRow.score}
                              </TableCell>
                              <TableCell >
                                 <div style={{marginLeft:"20px"}}>{historyRow.email}</div>
                              </TableCell>
                          </TableRow>
                      );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
     
    </React.Fragment>
  );
}

function Row2(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
         <TableCell component="th" scope="row">
          {props.index + 1}
        </TableCell>
        <TableCell>

          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ?<IndeterminateCheckBoxIcon/>: <AddBoxIcon/>}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.deptName}
        </TableCell>
        <TableCell >All</TableCell>
        <TableCell >score</TableCell>
        <TableCell >All</TableCell>
        <TableCell ></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 ,margin:0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box >
              <Table  aria-label="purchases">
                <TableBody>
                {row.villages.length >0 ?row.villages.map((historyRow,index) => {
                      return (
                          <TableRow key={index}>
                          <TableCell></TableCell>
                              <TableCell style={{width:"500px"}}></TableCell>
                             

                              <TableCell style={{width:"290px"}}><div style={{ display:"flex",justifyContent:"flex-start",alignItems:"center",gap:"5px", fontSize:"15px"}}><ErrorIcon  /> {historyRow.villageName}</div></TableCell>
                              <TableCell >
                                 {historyRow.deptScore}
                              </TableCell>
                              <TableCell>
                                 <div style={{marginLeft:"20px"}}>{row.email}</div>
                              </TableCell>
                          </TableRow>
                      );
                  }):<div style={{textAlign:"center",padding:"20px 0"}}>No villages found</div>}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
     
    </React.Fragment>
  );
}



const rows = [
    {
    rank:"1",
    villageName:"kandhar",
    score:"100",
    departmants: [
      {
        departmentName: 'स्वच्छता विभाग',
        score:"50",
        surveyor: "anji",
      },
      {
        departmentName: 'स्वच्छता विभाग 2',
        score:"50",
        surveyor: "anji2",
      },
    ],
},  {
    rank:"2",
    villageName:"kandhar2",
    score:"40",
    departmants: [
      {
        departmentName: 'स्वच्छता विभाग',
        score:"30",
        surveyor: "anji",
      },
      {
        departmentName: 'स्वच्छता विभाग 2',
        score:"10",
        surveyor: "anji2",
      },
    ],
}
];

export default function CollapsibleTable() {
  const dispatch = useDispatch()
  const [range,setRange] = React.useState({
    startRange:0,
    endRange:5
  })
  const [selected, setSelected] = useState([]);
  const [buttons,setButtons] = React.useState(0)
  const [rowsData, setRowsData] = React.useState([])
  const [rows2Data, setRows2Data] = React.useState([])
  const [survay, setSurvay] = React.useState([])
  const [villages, setVillages] = React.useState([])
  const [filteredArray , setFilteredArray] = React.useState([])
  const [departmantListData, setDepartmsntListData] = React.useState([])
  const [filterDepartmantListData, setFilterDepartmsntListData] = React.useState([])

  const [selectedDepartmant, setSelectedDepartmants] = React.useState([])
  const [questionFilter, setQuestionFilter] = React.useState({
    villageUniqueId:"",
    deptId:"",
    surveyId:""
  })
  const [listOfQuestion, setListOfQuestion] = useState([])
  const [pageStart, setPageStart] = useState(0)
  const [pageNext, setPageNext] = useState(5)




  const data = [
    {
      label: "one",
      value: "one",
      
    },
    {
      label: "two",
      value: "two"
    },
    {
      label: "three",
      value: "three"
    },
    {
      label: "four",
      value: "four"
    },
    {
      label: "five",
      value: "five"
    },
    {
      label: "six",
      value: "six"
    },
    {
      label: "seven",
      value: "seven"
    },
    {
      label: "eight",
      value: "eight"
    },
    {
      label: "nine",
      value: "nine"
    },
    {
      label: "data",
      value: "ten"
    }
  ];
  const filterOption = ({ label, value }, string) => {
  if (string === "") return true;
  const parsedString = string.split(/[, ]+/);
  for (const string of parsedString) {
    // Need to check of string is not empty after the split
    if (string !== "" && (label.includes(string)))
      return true;
  }

  return false;
};
  
const exportToExcel = () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  // Define headers
  const headers = [
    { header: 'Village Name', key: 'villageName', width: 20 },
    { header: 'Department Name', key: 'deptName', width: 40 },
    { header: 'Department Score', key: 'deptscore', width: 40 },
    
    { header: 'question', key: 'question', width: 40 },
    { header: 'score', key: 'score', width: 20 },
    
    { header: 'Surveyor', key: 'surveyor', width: 40 },


  ];

  // Set headers
  worksheet.columns = headers;

  // Add data rows
  rowsData.forEach((item) => {
    item.departmants.forEach((dept) => {
      dept.schemeDetails.questionnaire.forEach((question)=>{
        worksheet.addRow({
          villageName: item.villageName,
          deptName: dept.deptName,
          deptscore: dept.score,
          question:question.question,
          score:question.score,
          surveyor:dept.email,
        });
      })
      
    });
  });

  // Generate a unique filename (e.g., based on timestamp)
  const fileName = `exported_data_${Date.now()}.xlsx`;

  // Generate the blob
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save the blob as a file using file-saver
    saveAs(blob, fileName);
  });
};

 React.useEffect(()=>{
  console.log(selected,"selected")
   
   dispatch(getAllVilleges()).then((res)=>
   {
    console.log(res)
    let arr = []

    res.payload.data.map((pushUpdetedData)=>{
       arr.push({
        label:pushUpdetedData.villageName,
        value:pushUpdetedData.villageUniqueId,
        
       })
      
    }

    )
    setVillages(arr)
  
  })

 
   dispatch(surveyList()).then((res)=>{
    console.log(res.payload.data)
    let arr = []

    res.payload.data.map((pushUpdetedData)=>{
       arr.push({
        label:pushUpdetedData.IsOnGoingSurvey == "OnGoing" ?`${pushUpdetedData.surveyName}🟢`:pushUpdetedData.IsOnGoingSurvey == "pending"?`${pushUpdetedData.surveyName}🔴`:`${pushUpdetedData.surveyName}🟡`,
        value:pushUpdetedData._id,
        status:pushUpdetedData.IsOnGoingSurvey
        
       })
    })


    setSurvay(arr)

    
})
 },[pageStart])

 React.useEffect(()=>{
  if(survay.length !=0)
  {
    console.log(survay,"gfgf")
  dispatch(survayRank({startRange:range.startRange,endRange:range.endRange,id:selected.length !=0?selected[0].value:survay?survay.filter((val)=>val.status == "OnGoing")[0]?survay.filter((val)=>val.status == "OnGoing")[0].value:survay.filter((val)=>val.status == "pending")[0].value:""})).then((res)=>{
     
    let pageByData = []

    for(let rangeData = pageStart; rangeData<pageNext;rangeData++)
    {
        pageByData.push(res.payload.data[rangeData])
    }

   setRowsData([...pageByData])
   setFilteredArray(res.payload.data)
   setButtons(res.payload.btn)
  
 })
}
 },[pageStart,selected,survay])
 React.useEffect(()=>{
  dispatch(survayRankByDept({startRange:range.startRange,endRange:range.endRange})).then((res)=>{
    setRows2Data(res.payload.data)
    console.log(res.payload)
    setFilterDepartmsntListData(res.payload.data)

    
    setButtons(res.payload.btn)
  })
},[])

React.useEffect(()=>{
  dispatch(departmantList()).then((res)=>{
    console.log(res.payload.data)
    let arr = []

    res.payload.data.map((pushUpdetedData)=>{
       arr.push({
        label:pushUpdetedData.deptName,
        value:pushUpdetedData._id,
        
       })
    })
    setDepartmsntListData(arr)
  })

},[])

const  result = (params)=> {
  console.log(params,'319');
}
 const [tabs, setTabs] = React.useState(0);
 const [selectedVillages,setSelectedVillages] = useState([])
//  React.useEffect(()=>{
   
//    let data = [];
//    setFilteredArray(data)
//    console.log(rows2Data,selected,'296')

//   // if(selected.length > 0 &&  selectedVillages.length >0 ){
//   //   setFilteredArray([])
//   //   let min =  Math.min(selected.length,selectedVillages.length)
//   //   for(let i =0 ; i<rowsData.length; i++){
//   //     for(let j = 0;j<min ; j++){
//   //       if( rowsData[i].villageName === selectedVillages[j].label && selected[j].label){
//   //         data.push(rowsData[i])
//   //       }
//   //     }
//   //   }
//   //   setFilteredArray(data)
//   // }
//   // else if (selected.length > 0 &&   selectedVillages.length == 0){
//   //   setFilteredArray([])

//   //   let min =  selected.length
//   //   for(let i =0 ; i<rowsData.length; i++){
//   //     for(let j = 0;j<min ; j++){
//   //       // if( rowsData[i].villageName === selectedVillages[j].label){
//   //       //   // data.push(rowsData[i])
//   //       // }
//   //     }
//   //   }
    

//   //   setFilteredArray(data)
//   // }
//   // else if (selected.length == 0 &&   selectedVillages.length > 0){
//   //   setFilteredArray([])
//   //   let min =  selectedVillages.length
//   //   for(let i =0 ; i<rowsData.length; i++){
//   //     for(let j = 0;j<min ; j++){
//   //       if( rowsData[i].villageName === selectedVillages[j].label){
//   //         data.push(rowsData[i])
//   //       }
//   //     }
//   //   }
//   //   console.log(data,'296')

//   //   setFilteredArray(data)
//   // }else{
//   //   data =[];
//   // }
    
// console.log(data,'298')
// },[selected,selectedVillages])

React.useEffect(()=>{
  if(selected.length>0)
  {
    let filter = []

    if(filteredArray)
    {
    filteredArray.map((valueData,index)=>{

                 selected.map((selecteDValue)=>{

                  if(valueData.surveyId == selecteDValue.value)
                  {
                     filter.push(valueData)
                  }
                 })
    })
    let newFilter = []
    for(let rangeData = pageStart; rangeData<pageNext;rangeData++)
    {
        newFilter.push(filter[rangeData])
    }
    setRowsData(newFilter)
  }
  }
  else{
    let newFilter = []
    for(let rangeData = pageStart; rangeData<pageNext;rangeData++)
    {
        newFilter.push(filteredArray[rangeData])
    }
    setRowsData(newFilter)
  }

},[selected])

React.useEffect(()=>{
  if(selectedVillages.length>0)
  {
    let filter = []

    if(filteredArray)
    {
    filteredArray.map((valueData,index)=>{

      selectedVillages.map((selecteDValue)=>{
          

                  if(valueData.villageUniqueId == selecteDValue.value)
                  {
                     filter.push(valueData)
                  }
                 })
    })

    setRowsData(filter)
  }
  }
  else{
    setRowsData(filteredArray)
  }

},[selectedVillages])

React.useEffect(()=>{

  if(questionFilter.villageUniqueId !="" && questionFilter.deptId != "" && questionFilter.surveyId != "")
  {
    dispatch(questionListFilter(questionFilter)).then((quest)=>{
      console.log(quest)

      setListOfQuestion(quest.payload)
    })
  }
  else{
    setListOfQuestion([])

  }

},[questionFilter.villageUniqueId,questionFilter.deptId,questionFilter.surveyId])

React.useEffect(()=>{
  if(selectedDepartmant.length>0)
  {
    let filter = []
    if(filterDepartmantListData)
    {
    filterDepartmantListData.map((valueData,index)=>
    {
      // console.log(valueData)

      selectedDepartmant.map((selecteDValue)=>{
          
        console.log(valueData,selecteDValue)

                  if(valueData.id == selecteDValue.value)
                  {
                     filter.push(valueData)
                  }
                 })
    })

  }

    setRows2Data(filter)
  }
  else{
    setRows2Data(filterDepartmantListData)
  }

},[selectedDepartmant])

const columns = [
  { field: "schemeName", headerName: "schemeName", width: 250 },
  { field: "question", headerName: "question", width: 250 },

  { field: "score", headerName: "score", width: 250 },

];

 const handleChange = (event, newValue) => {
  setTabs(newValue);
   console.log(newValue);
 };

const changeNumber = (value,number)=>{
   console.log(number)
   setPageStart(number == 1?0:pageNext )
   setPageNext(5 * number)

}

  return (
    <div style={{padding:"70px"}}>
    <Tabs
    value={tabs}
    onChange={handleChange}
    aria-label="disabled tabs example"
  >
    <Tab label="Villages Wise" />
    <Tab label="Department Wise" />
    <Tab label="Question Wise " />

  </Tabs>
  {tabs == 0?
    <div>
    <div style={{display:"flex",alignItems:" center"}}>
 <div style={{width:"300px"}}>
        <MultiSelect value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
        
        isCreatable={true} options={survay} onSelectOptions={result} />
    </div>
    <div style={{width:"300px"}}>
        <MultiSelect value={selectedVillages}
        onChange={setSelectedVillages}
        labelledBy={"Select"}
        isCreatable={true} options={villages} onSelectOptions={result} />
        </div>
        <div style={{width:"200px"}}>
    {/*<CChart
  type="doughnut"
  data={{
    labels:['available','empty'],
    datasets: [
      {
        backgroundColor: ['#41B883',"#0009"],
        data: [0,100],
      },
    ],
  }}
/>*/}
    </div>
    </div>
    
    <TableContainer component={Paper}>

      <Table aria-label="collapsible table">
        <TableHead>
        <TableRow>
    <TableCell style={{display:"flex",alignItems:"center",width:"100%"}} colSpan={2} fullWidth>Team 
    <Button onClick={exportToExcel}   >download excel</Button>
    
    </TableCell>
            <TableCell />
            <TableCell /> 
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          <TableRow>
          <TableCell>Rank</TableCell>
            <TableCell />
            <TableCell>Village Name</TableCell>
            <TableCell >Department Name</TableCell>
            <TableCell >Score&nbsp;(g)</TableCell>
            <TableCell >Surveyor&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData?rowsData.map((row,index) => (<>
            {row != null ?<Row key={index} row={row} index={index} setQuestionFilter={setQuestionFilter} setTabs={setTabs}/>:<div style={{padding:"10px",textAlign:"center"}}> </div>}
            </>
          )):""}
        </TableBody>
      </Table>

      <TableRow>
      <TableCell colSpan={3} style={{textAlign:"center"}} >
            <div style={{marginLeft:"300px",width:"400px"}}> <Pagination count={Math.ceil(buttons) == 0 ?1:Math.ceil(buttons)} shape="rounded" onChange={changeNumber} style={{width:"400px",textAlign:"center"}}/></div>
     </TableCell>
      </TableRow>
    </TableContainer>
    </div>
    :""}

    {tabs == 1? 
      <div>
      <div style={{display:"flex"}}>
      
         <div style={{width:"300px"}}>
             <MultiSelect value={selectedDepartmant}
             onChange={setSelectedDepartmants}
             labelledBy={"Select"}
             isCreatable={true} options={departmantListData} onSelectOptions={result} />
             </div>
         </div>
      <TableContainer component={Paper}>
    <Table aria-label="collapsible table">
      <TableHead>
      <TableRow>
        <TableCell colSpan={3} fullWidth>Team</TableCell>
          <TableCell />
          <TableCell /> 
          <TableCell />
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
        <TableCell>Rank</TableCell>
          <TableCell />
          <TableCell >Department Name</TableCell>
          <TableCell >Village Name</TableCell>
          <TableCell >Score&nbsp;(g)</TableCell>
          <TableCell >Surveyor&nbsp;(g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
         {rows2Data?rows2Data.length >0 ? rows2Data.map((row,index) => (<>
          {row != null ?<Row2 key={index} row={row} index={index} />:""}
          </>
        )) : rows2Data?rows2Data.map((row,index) => (<>
          {row != null ?<Row2 key={index} row={row} index={index} />:""}
          </>
        )):"":<div style={{textAlign:"center",width:"100%",padding:"10px"}}>no data found</div>}
      </TableBody>
    </Table>
    </TableContainer>
    </div>
:""}
{tabs == 2?<div> 
   <div style={{display:"flex",alignItems:" center"}}>
<div style={{width:"300px"}}>
{console.log(selected)}
<Select filterOption={filterOption} options={survay} onChange={(e)=>setQuestionFilter({...questionFilter,surveyId:e.value})} />

  
   </div>
   <div style={{width:"300px"}}>
<Select filterOption={filterOption} options={villages} onChange={(e)=>setQuestionFilter({...questionFilter,villageUniqueId:e.value})} />

  
       </div>
       <div style={{width:"300px"}}>
       <Select filterOption={filterOption} options={departmantListData} onChange={(e)=>setQuestionFilter({...questionFilter,deptId:e.value})} />

       </div>
    
       
       </div>
       <div style={{minWidth:"300px",maxWidth:"100%",width:"100%",background:"white"}}>
          
       <div style={{ height: 400, width: "100%", background: "white" }}>
       <DataGrid
       rows={listOfQuestion}
       columns={columns}
       pageSize={5}
       getRowId={(row) =>  row.questionID
}
      
       rowsPerPageOptions={[5]}
/>
</div>
</div>
       
       </div>:""}
    </div>
  );
}
