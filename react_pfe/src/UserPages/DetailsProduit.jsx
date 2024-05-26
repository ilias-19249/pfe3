import React, { useEffect } from 'react'
import DProduit from '../UserComponents/DProduit'
import { useNavigate } from 'react-router-dom'
import Navbar from './../UserComponents/Navbar';

export default function DetailsProduit() {
  const navigate=useNavigate();
  // const checkLogin =()=>{
  //   if(!localStorage.getItem('userToken')){
  //   navigate('/login')
  //   console.log('you are not  connected');
  //   }
  // }
  useEffect(()=>{
    //  checkLogin();
  },[])
  return (
    <div>
      <Navbar/>
      <DProduit />
    </div>
  )
}
