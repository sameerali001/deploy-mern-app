import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar1 from './Component/Navbar/Navbar1';
import Login from './Component/Login/Login'
import Home from './Component/Home/Home';
import Signup from './Component/Signup/Signup';
import Refershandler from './Component/Refershandler';




function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  
  const PrivateRoute =({element})=>{
    return isAuthenticated ? element: <Navigate to ="/login"/>
  }

  return (

    <Router>
      <Navbar1 />
      <Refershandler setAuthenticated={setAuthenticated}/>
      <Routes>
        <Route path="/" element={<Navigate to = "/login" />} />
        <Route path="/home" element={<PrivateRoute element={<Home/>}/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
