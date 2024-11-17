import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../util";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handlechang = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyFormdata = { ...formData };
    copyFormdata[name] = value;
    setFormData(copyFormdata);
  };
  console.log("data-->", formData);
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {name,email,password}= formData; 
    if (!name||!email||!password){
      return handleError("All fields are require")
    }
    try {
      const url ="http://localhost:8080/auth/signup";
      const response = await fetch(url,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      const {success,message,error } = result;
      if(success){
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login')
        }, 1000);
      }else if(error){
        const details = error?.details?.[0].message || message || "Signup failed";       
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
        className="card position-absolute top-50 start-50 translate-middle"
        style={{ width: "20rem" }}
      >
        <div className="card-header text-center">Sign Up</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Enter your Name
              </label>
              <input
                name="name"
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                onChange={handlechang}
                value={formData.name}
              />
            </div>
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
                value={formData.email}
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
                value={formData.password}
              />
            </div>
            <div className="card-footer text-center">
          <button type="submit"className="btn btn-success w-100">Sign Up</button>
          <span>
            Already have an account?
            <Link to="/login">Login</Link>
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
