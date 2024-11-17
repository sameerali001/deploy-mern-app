import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleSuccess } from '../util';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Navbar1 = () => {
  const [isLoggedIn, setLoggedIn] = useState();
  const [isLoggingOut, setIsLoggingOut] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    handleSuccess("User logged out successfully");
    setIsLoggingOut(true);
    localStorage.removeItem('loggedinUser')
    localStorage.removeItem('token')
    setLoggedIn(false);
    setTimeout(() => {
      navigate('/login');
      setIsLoggingOut(false);
    }, 1000);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4gMkbXUKQhjLWIrRgoBuMMuM_Me8hxX6TKg&s" alt="Brand Logo" height="30" />
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/home">
              Home
            </Link>
           
          </div>
          <div className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <button
                className="nav-link btn btn-outline-danger"
                onClick={handleLogout}
                aria-label="Logout"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <Link className="nav-link btn btn-outline-success" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      <ToastContainer />
      </div>
    </nav>
  );
};

export default Navbar1;
