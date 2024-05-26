import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import './Scommandes.css'
export default function Scommandes() {
  const navigate = useNavigate();
   const [commandes,setCommandes]=useState([]);
    const id=localStorage.getItem('user_id');
    const getCommandes = async()=>{
    const data=await axios.post(`http://localhost:8000/afficherCommandes/${id}`);
    setCommandes(data.data.commandes);
    }
    const checkLogin=()=>{
      const verify=localStorage.getItem('user_authentication')
      if(!verify){
        navigate('/')
      }
    }
    const confirmerReception=async(p)=>{
      const data=await axios.post(`http://localhost:8000/confirmerReception/${p}`)
      toast.success('le producteur sera informé par votre réception de la commande', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        getCommandes();
    }
    useEffect(()=>{
    getCommandes()
    checkLogin()
    },[])
  return (
    <div>
      <h1 style={{ position:'absolute',top:'80px', textAlign:'center' ,left:'43rem',marginBottom:'20px' }}> Suivi des  commandes </h1>
      <div className="overflow-x-auto" style={{ marginLeft:'45px' }}>
  <table  style={{ width:'1110px' , marginLeft:'10rem',marginTop:'6rem' }}>
    <thead>
      <tr>
        <th>id</th>
        <th style={{ whiteSpace:'nowrap' }}>Nom du client</th>
        <th>Nom du produit</th>
        <th>Quantité</th>
        <th>Prix total  </th>
        <th>date de commande</th>
        <th>Message</th>
        <th> La réception de votre commande </th>
      </tr>
    </thead>
    <tbody>
      
    {commandes.map(p=>(
         <tr>
        <td>{p.reference}</td>
        <td>{p.nom_client}</td>
        <td>{p.nom_produit}</td>
        <td>{p.quantite}</td>
        <td>{p.prix_total} <b>DHs</b></td>
        <td>{p.date_commande}</td>
        <td>{p.message}</td>
        <td>{p.confirmation_admin === 0 || p.confirmation_admin === null ? 'pas encore':'reçu'}   </td>
         {/* <td>{p.nom_client}</td> */}
      </tr>
      ))}
 <ToastContainer />
       
      
    
    </tbody>
  </table>
</div>
    </div>
  )
}
