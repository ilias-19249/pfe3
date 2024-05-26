import React, { useEffect } from 'react'
import Orders from '../UserComponents/Orders'
import { useNavigate } from 'react-router-dom'
import Navbar from './../UserComponents/Navbar';

export default function Commandes() {
 const navigate=useNavigate();
  
  useEffect(()=>{
    // checkLogin();
  },[]);
  return (
    <div>
      {/* <Navbar/> */}
      <Navbar/>
        <Orders />
    </div>
  )
}
