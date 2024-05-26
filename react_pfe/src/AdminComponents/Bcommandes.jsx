import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Bcommandes.css'
import { format } from 'date-fns';

export default function Bcommandes() {
    const [bonneCommandes,setBonneCommandes]=useState([])
   
   const getBonneCommandes=async ()=>{
    const data=await axios.get('http://localhost:8000/admin/bonneCommande');
    setBonneCommandes(data.data.result)
   }
   useEffect(()=>{
   getBonneCommandes()
   },[])

  return (
    <div>
    <div>
   <h1 style={{ position:'absolute',top:'10px', textAlign:'center' ,left:'45rem',marginBottom:'20px',color:'black' }}> Commandes </h1>
   <div className="overflow-x-auto" style={{ marginLeft:'-110px' , position:'absolute',top:'3rem',left:'33rem' }}>
<table  style={{ width:'850px' }}>
 <thead>
   <tr>
    <th>Reference</th>
    <th>Nom client</th>
    <th>Nom producteur </th>
    <th>Date</th>
    <th> Etat commande </th>
   </tr>
</thead>
 <tbody>
   {bonneCommandes.map(p=>(
      <tr key={p.id} className="bg-base-200">
      <td>{ p.reference}</td>
      <td>{ p.nom_client}</td>
      <td>{ p.nom_producteur}</td>
      <td>{format(new Date(p.created_at), 'yyyy-M-dd HH-mm-ss')}</td>
      <td>
        {p.bonne_commande === 0 && 'commande en cours'}
      {p.bonne_commande === 1 && 'Bonne commande' }
      {p.bonne_commande ===9  && 'Mauvaise Commande'}
      </td>
   </tr>
   ))}
    
   
 
 </tbody>
</table>
</div>
 </div>

 </div>
  )
}
