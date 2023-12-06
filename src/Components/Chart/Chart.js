import React, { useEffect,useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import { surveyChart } from '../../Services/Apis/Api';
// import faker from 'faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' ,
    },
    title: {
      display: true,
      text: 'Survey Chart',
    },
  },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', "Aug","Sep","Oct","Nov","Dec"];



export function Charts() {
  let [arrayData, setArrayData] = useState({})
  const dispatch = useDispatch()
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Survey',
        data: arrayData.totalSurvey?arrayData.totalSurvey:[0,0,0,0,0,0,0,0,0,0,0,0],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Panding Survey',
        data: arrayData.totalPending?arrayData.totalPending:[0,0,0,0,0,0,0,0,0,0,0,0],
  
        borderColor: ' rgb(255, 99, 132)',
        backgroundColor: ' rgba(255, 99, 132, 0.5)',
      },
      {
          label: 'Complete Survey',
          data: arrayData.totalCompleted?arrayData.totalCompleted:[0,0,0,0,0,0,0,0,0,0,0,0],
    
          borderColor: 'rgb(118 188 52 / 60%)',
          backgroundColor: 'rgb(118 188 52 / 60%)',
        },
    ],
  };
  useEffect(()=>{
    dispatch(surveyChart()).then((res)=>{
      console.log(res.payload,"kljk")
      setArrayData(res.payload)

    })
  },[])
  return <Bar options={options} data={data} />;
}
