import React, { useEffect,useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useDispatch } from 'react-redux';
import { listOfAssignUserDeptVillage } from '../../Services/Apis/Api';
import { Button } from '@mui/material';
import { dispatch } from 'd3';
function ExcelExportButton({ data }) {
  const exportToExcel = () => {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Define the columns for the worksheet (optional)
    const columns = [
      { header: '_id', key: '_id' },
      { header: 'villageName', key: 'villageName' },
      { header: 'villageUniqueId', key: 'villageUniqueId' },
      { header: 'userId', key: 'userId' },
      { header: 'deptId', key: 'deptId' },
      { header: 'deptName', key: 'deptName' },
      { header: 'name', key: 'name' },
      { header: 'email', key: 'email' },
    ];

    worksheet.columns = columns;

    // Add data to the worksheet
    data.forEach((row) => {
      worksheet.addRow({
        _id: row._id,
        districtName: row.districtName,
        villageName: row.villageName,
        villageUniqueId: row.villageUniqueId,
        name: row.name,
        email: row.email,
        userId: row.userId,
        deptId: row.deptId,
        deptName: row.deptName,
      });
    });

    // Generate a blob from the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Save the blob as a file using file-saver
      saveAs(blob, 'data.xlsx');
    });
  };

  return (
    <Button onClick={exportToExcel}>Export to Excel</Button>
  );
}

export default function DownloadExcel() {
  let dispatch = useDispatch()
  let [data, setData] = useState([])
  useEffect(()=>{
    dispatch(listOfAssignUserDeptVillage()).then((res)=>{
      console.log(res.payload.newArr,"hii")
      setData(res.payload.newArr)
    })
  },[])
  
  
  return (
    <div>
      <ExcelExportButton data={data} />
    </div>
  );
}
