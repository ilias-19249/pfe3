import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProduitPanier from '../UserComponents/ProduitPanier'
import Navbar from './../UserComponents/Navbar';

export default function Panier() {
  const navigate=useNavigate();
  

  useEffect(()=>{
  },[])
  return (
    <div>
      <Navbar/>
       <ProduitPanier />
    </div>
  )
}
