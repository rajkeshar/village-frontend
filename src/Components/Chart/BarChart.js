import React,{useEffect,useState} from 'react';
import * as d3 from 'd3';
import { getAllDistrict,totalVilleges,departmantList,surveyList } from '../../Services/Apis/Api';
import { useDispatch } from 'react-redux';
import {Charts} from './Chart';
import { Card } from '@mui/material';

const BarChart = () => {
    const dispatch = useDispatch()
    const [district, setDistrict] = useState(0)
    const [villege, setVillege] = useState(0)
    const [departmants,setDepartmants] = useState(0)
    const [surveys,setSurveys] = useState(0)




    useEffect(() => {
        callAllCountOfCardDetail()
    }, [])

    function callAllCountOfCardDetail()
    {
       dispatch(getAllDistrict()).then((res)=>{
        setDistrict(res.payload.data.length)
       })
       dispatch(totalVilleges()).then((res)=>{
        setVillege(res.payload.result[0].totalVillages)
       })
       dispatch(departmantList()).then((res)=>{
        setDepartmants(res.payload.data.length)
      })
      dispatch(surveyList()).then((res)=>{
        
      setSurveys(res.payload.data.length)
    })
    }
  return (
    <div className="container items-center px-4 py-8 m-auto mt-5">
  <div className="flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0">
    <div className="w-full p-2 lg:w-1/4 md:w-1/2">
      <div
        className="flex flex-col px-6 py-10 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
        <div className="flex flex-row justify-between items-center">
          <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-gray-50" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd" />
              <path fill-rule="evenodd"
                d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div className="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500 group-hover:text-gray-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">{departmants}</h1>
        <div className="flex flex-row justify-between group-hover:text-gray-200">
          <p>Number Of Departmant</p>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div className="w-full p-2 lg:w-1/4 md:w-1/2">
      <div
        className="flex flex-col px-6 py-10 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
        <div className="flex flex-row justify-between items-center">
          <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-gray-50" viewBox="0 0 20 20"
              fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          </div>
          <div className="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500 group-hover:text-gray-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">{district}</h1>
        <div className="flex flex-row justify-between group-hover:text-gray-200">
          <p>Number of District</p>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div className="w-full p-2 lg:w-1/4 md:w-1/2">
      <div
        className="flex flex-col px-6 py-10 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
        <div className="flex flex-row justify-between items-center">
          <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-gray-50" viewBox="0 0 20 20"
              fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fill-rule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div className="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500 group-hover:text-gray-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">{villege}</h1>
        <div className="flex flex-row justify-between group-hover:text-gray-200">
          <p>Number of Village</p>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div className="w-full p-2 lg:w-1/4 md:w-1/2">
      <div
        className="flex flex-col px-6 py-10 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
        <div className="flex flex-row justify-between items-center">
          <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-gray-50" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
          <div className="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500 group-hover:text-gray-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
           
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">{surveys}
        </h1>
        <div className="flex flex-row justify-between group-hover:text-gray-200">
          <p>Number of Survey</p>
         
        </div>
      </div>
    </div>
  </div>
  <Card><Charts/></Card>
</div>
  );
}

export default BarChart;