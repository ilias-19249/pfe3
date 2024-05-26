import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Commandes from './../ProducerComponents/Commandes';
import Main from '../ProducerDashboard/Main';
export default function Orders() {
  const navigate = useNavigate();

  const checkLogin=()=>{
    const verify=localStorage.getItem('producer_authentication')
    if(!verify){
      navigate('/')
    }
}
useEffect(()=>{
 checkLogin()
},[])
  return (
    <div>
      <Main />
      <Commandes />
    </div>
  )
}
