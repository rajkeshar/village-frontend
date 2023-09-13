import React from 'react';
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Total Survey',
      data: ['100','300','30','40','50','60','70'],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Panding Survey',
      data: ['30','100','30','40','50','60','70'],

      borderColor: ' rgb(255, 99, 132)',
      backgroundColor: ' rgba(255, 99, 132, 0.5)',
    },
    {
        label: 'Complete Survey',
        data: ['50','200','30','40','50','60','70'],
  
        borderColor: 'rgb(118 188 52 / 60%)',
        backgroundColor: 'rgb(118 188 52 / 60%)',
      },
  ],
};

export function Charts() {
  return <Bar options={options} data={data} />;
}
