import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import axios from "axios"
import { loginUser,verifyOtp } from "../Services/Apis/Api";
import { useDispatch } from "react-redux";
import { useCookies } from 'react-cookie';
import AlertMssg from "./Alert/Alert";
import { Link } from "react-router-dom";
const Login = () => {
  const naviagte = useNavigate();
  const [code, setCode] = useState("");
  const handleChange = (code) => setCode(code);
  const [isVerify,setIsVerify] = useState(false);
  const dispatch = useDispatch()
  const [openAlert,setOpenAlert] = React.useState({
    open:false,
    mssg:"add",
    type:"success"
  })
  const [user, setUser] = useState({
    "email":"",
    "password":""
})
const [token, setToken] = useState("")
const [cookies, setCookie] = useCookies(['token']);
  
  function signIn(){
   
    dispatch(loginUser(user)).then((res)=>{
      console.log(res.payload)
      
      if(res.payload.message == "Logged in successfully")
      {
        setToken(res.data)
        setCookie("token",res.payload.token)
        console.log(res.payload.data,"res.payload")
        localStorage.setItem("User", JSON.stringify(res.payload.data));
        naviagte("/dashboard")
        window.location.reload()
      }
      else{
        setOpenAlert({
          open:true,
          mssg:res.payload.response.data.message,
          type:"warning"
        })
        
      }
      
      
     

    }).catch((err)=>{
      
    })


   
  }
  return (
    <div id="app">
      <div className="max-w-md m-auto mt-6">
        <div className="border-t-4 border-blue-600 overflow-hidden rounded shadow-lg">
          <h3 className="text-xl text-center mt-8 mb-8">Welcome back!</h3>
          <div className="px-4 mb-4">
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray rounded w-full p-3"
              onChange={(e)=>setUser({...user,"email":e.target.value})}

            />
          </div>
          <div className="px-4 mb-4">
            <input
              type="password"
              placeholder="Password"
              className="border border-gray rounded w-full p-3"
              onChange={(e)=>setUser({...user,"password":e.target.value})}
            />
          </div>
          <div className="px-4 mb-4 flex">
            <div className="w-1/2">
           {isVerify? <OtpInput
            value={code}
            onChange={handleChange}
            numInputs={6}
            separator={<span style={{ width: "8px" }}></span>}
            isInputNum={true}
            shouldAutoFocus={true}
            inputStyle={{
              border: "1px solid  blue",
              borderRadius: "8px",
              width: "54px",
              height: "54px",
              fontSize: "12px",
              color: "#000",
              fontWeight: "400",
              caretColor: "blue",
              marginTop:"28px"
            }}
            focusStyle={{
              border: "1px solid #CFD3DB",
              outline: "none"
            }}
          />:""}
            </div>
            <div className="w-1/2 text-right">
              <Link to="/changePassword" className="font-semibold no-underline text-black">
                Forgot your password?
              </Link>
            </div>
          </div>
          <div className="px-4 mb-6">
            <button
              className="border border-blue-500 bg-blue-600 rounded w-full px-4 py-3 text-white font-semibold"
              onClick={signIn}
            >
              Sign in
            </button>
          </div>
          {/*<div className="bg-gray-100 text-center text-gray-700 py-5">
            Don't have a account?
            <button
              className=" rounded w-full px-4 py-3 text-black font-semibold"
              onClick={() => naviagte("/Signup")}
            >
              Signup
            </button>
          </div>*/}
          
          <AlertMssg  action={openAlert} setAction={setOpenAlert}/>
        
        </div>
      </div>
    </div>
  );
};

export default Login;
