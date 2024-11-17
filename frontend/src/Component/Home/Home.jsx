import React, { useEffect, useState } from 'react';
import { handleError } from '../util';

const Home = () => {
  const [loggedInUser, setloggedInUser] = useState();
  const [products, setProducts] = useState();

  useEffect(()=>{
    const username = localStorage.getItem('loggedinUser');
    setloggedInUser(username)
  },[])
 const fetchProducts = async ()=>{
  try{
const url = "http://localhost:8080/products";
const headers = {
  headers:{
    'Authorization': localStorage.getItem('token')
  }
}
const response = await fetch(url,headers);
const result = await response.json();
console.log(result);
setProducts(result);
  }catch(err){
    handleError(err)

  }
 }
 useEffect(()=>{
  fetchProducts()
 },[])

  return (
    <div>
      <h1 className='welcome-message'>
        {loggedInUser !== "Guest" ? `Welcome, ${loggedInUser}` : "Welcome, Guest"}
      </h1>
      {products && products.map((i)=>(
        <ul>
        <li> <span>{i.name}</span> <span>{i.price}</span></li> 
        
          
        </ul>
      ))}
    </div>
  );
};

export default Home;
