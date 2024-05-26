import React from 'react'
import Produit from '../UserComponents/Produit'
import { Link } from 'react-router-dom'
import './Produits.css'
import Navbar from '../UserComponents/Navbar'


export default function Produits() {
   
return (
    <div>
      <Navbar />
  {/* <Link to={"Panier"}>Panier</Link> */}
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', justifyContent:'space-around'}}> <Produit /></div>
     
     
    </div>
  )
}
