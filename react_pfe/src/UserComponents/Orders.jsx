import React,{ useEffect, useState }  from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Commandes.css'

export default function Orders() {
 const navigate=useNavigate();
    const [commandes , setCommandes]=useState([]);
 
    // const checkLogin =()=>{
    //   if(!(localStorage.getItem('user_authentication') == 'authenticated' )){
    //   navigate('/')
    //   }
    // }
    const getCommandes=async ()=>{
        const id=localStorage.getItem('user_id');
        const data=await axios.post(`http://localhost:8000/afficherCommandes/${id}`);
        setCommandes(data.data.commandes);
    }
    
    useEffect(()=>{
    getCommandes();
    // checkLogin();
    },[]);

  return (
    <div>
       <div>
      <h2 style={{ textAlign:'center' }}>Commandes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Produit</th>
            <th>Date</th>
            <th>Facturation</th>
          </tr>
        </thead>
        <tbody>
            {commandes.map((commande)=>(
               <tr key={commande.reference}>
            <td>{commande.reference}</td>
             <td>{commande.nom_produit}</td>
            <td>{commande.date_commande}</td>
            <td>{commande.confirmation_admin==null? '' :  <button  className='btn btn-success'><Link className='text-light text-decoration-none' to={`Facturation/${commande.reference}`}>facturation</Link></button>}   </td>
            {/* <td> {commande.confirmation_admin} </td> */}
          </tr> 
            ))}
          
        </tbody>
      </table>
    </div>
    </div>
  )
}
