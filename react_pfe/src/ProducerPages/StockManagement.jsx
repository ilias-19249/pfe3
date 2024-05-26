import React, { useEffect } from 'react'
import ProduitsCrud from './../ProducerComponents/ProduitsCrud';
import Main from '../ProducerDashboard/Main';
import { useNavigate } from 'react-router-dom';


export default function StockManagement() {
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
      <ProduitsCrud />
    </div>
  )
}
