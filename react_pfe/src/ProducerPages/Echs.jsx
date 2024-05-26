import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Echanntillon from './../ProducerComponents/Echanntillon';
import Main from '../ProducerDashboard/Main';

export default function Echs() {
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
      <Echanntillon />
    </div>
  )
}
