import React,{useState, useEffect} from "react"
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Table from "./Components/Table";
// import Form from "./Form";
import Ragistration from "./Components/Ragistration";
import Detail from "./Components/Detail";
import Ui from "./Components/Ui"
// import Village from "./Components/Village";
import Otp from "./Components/Otp";
import { useSelector } from "react-redux";
import Chart from "./Components/Chart/BarChart";
import SingleDepartmentSchema from "./Components/Departmant/SingleDepartmentSchema";
import District from "./Components/Zone/District";
import Block from "./Components/Zone/Block";
import Survey from "./Components/Survey/Survey";
import Village from "./Components/Villeges/Village";
import User from "./Components/User/User";
import { useCookies } from "react-cookie";
import Taluka from "./Components/Zone/Taluka";
import Question from "./Components/Departmant/Question";
import ForgotPassword from "./Components/ForgotPassword";
import Notification from "./Components/Notification/Notification";
import User2 from "./Components/User2/User";
import CollapsibleTable from "./Components/Survey List";
import UserProfile from "./Components/User2/UserProfile";
function App() {
  // const {login} = useSelector(state=>state)
  const [login, setLogin] = useState(false)
  // console.log(login?login.payload?login.payload.success:"":"")
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  console.log(cookies.token)
  useEffect(() => {
  if(cookies.token)
  {
    console.log("ki")
    setLogin(true)
  }
  }, [])
  return (
    <Routes>
    {!login?<><Route path="/" element={<Login/>} />
      <Route path="/Signup" element={<Ragistration />} />
      <Route path="/changePassword" element={<ForgotPassword/>} />
      <Route path="*" element={<Login/>}/>


          </>:<>
       <Route path="*" element={<Dashboard/>}/>

       <Route path="/dashboard" element={<Dashboard/>}>
        <Route path="/dashboard/table" element={<Table />} />
        <Route path="/dashboard/department/:departmentId/:departmentName" element={<SingleDepartmentSchema/>} />
        <Route path="/dashboard/district/" element={<District/>} />
        <Route path="/dashboard/user/" element={<User2/>} />
        <Route path="/dashboard/userProfile/" element={<UserProfile/>} />

        

        <Route path="/dashboard/question/:departmentId/:schemeId" element={<Question/>} />


        <Route path="/dashboard/district/:zoneId" element={<Block/>} />

        <Route path="/dashboard/taluka/:zoneId/:blockUniqueId" element={<Taluka/>} />
        <Route path="/dashboard/villege/:zoneId/:districtName/:blockUniqueId" element={<Village/>} />


        <Route path="/dashboard/notification" element={<Notification/>}/>

        <Route path="/dashboard/Form" element={<Detail />} />
        <Route path="/dashboard/Survey" element={<Survey/>} />
        <Route path="/dashboard" element={<Chart/>} />
        <Route path="/dashboard/surveyList" element={<CollapsibleTable/>}/>
        

        <Route path="/dashboard/Ui" element={<Ui />} />
      </Route>
      </>}
     
      
    </Routes>
  );
}

export default App;
