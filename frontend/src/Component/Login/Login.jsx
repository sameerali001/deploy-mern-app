import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../util";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handlechang = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyloginData = { ...loginData };
    copyloginData[name] = value;
    setLoginData(copyloginData);
  };
  console.log("data-->", loginData);
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const { email, password }= loginData; 
    if (!email || !password){
      return handleError("All fields are require")
    }
    try {
      const url ="http://localhost:8080/auth/login";
      const response = await fetch(url,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      const result = await response.json();
      const {success,message,token,name,error } = result;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token',token);
        localStorage.setItem('loggedinUser',name);
        setTimeout(() => {
          navigate('/home')
         
        }, 1500);
        window.location.reload();
      }else if(error){
        const details=error?.details[0].message;
        handleError(details)
        
      }else if(!success){
        handleError(message)
      }
      console.log(result);
    }catch (err){
      handleError(err);

    }
    
  }
  return (
    <div>
      <div
        className="card position-absolute top-50 start-50 translate-middle mt-3"
        style={{ width: "20rem" }}
      >
        <div className="card-header text-center">Login</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Enter your Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={handlechang}
                value={loginData.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Create a Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                className="form-control"
                placeholder="Create a password"
                onChange={handlechang}
                value={loginData.password}
              />
            </div>
            <div className="card-footer text-center">
          <button type="submit"className="btn btn-success w-100">Login</button>
          <span>
            Don't have an account?
            <Link to="/signup">signup</Link>
          </span>
        </div>
          </form>
        </div>
       
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
