import React, { useEffect } from 'react'
import Facture from '../UserComponents/Facture'
import { useNavigate } from 'react-router-dom'
import Navbar from './../UserComponents/Navbar';

export default function Facturation() {
  const navigate=useNavigate();
  // const checkLogin =()=>{
  //   if(!localStorage.getItem('userToken')){
  //   navigate('/login')
  //   console.log('you are not  connected');
  //   }
  // }
  useEffect(()=>{
  // checkLogin();
  },[])
  return (
    <div>
      <Navbar/>
        <Facture />
    </div>
  )
}
