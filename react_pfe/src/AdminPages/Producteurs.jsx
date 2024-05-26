import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Producteurs() {
const [producers,setProducers]=useState([])

const getProducers=async()=>{
    const data=await axios.get('http://localhost:8000/admin/producteurs');
    setProducers(data.data.producteurs);
}

    useEffect(()=>{
    getProducers()
    },[])
     const supprimerProducteurs=async (p)=>{
     const data=await axios.post(`http://localhost:8000/admin/supprimerProducteurs/${p}`);
     toast.success('Producteur Supprimé avec succès!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        });
        getProducers();

    }
  return (
    <div>
    <div className="overflow-x-auto" style={{ marginLeft:'-110px' , position:'absolute',top:'3rem',left:'33rem' }}>
      <h2 style={{ color:'black', textAlign:'center' }}> Producteurs </h2>
<table  style={{ width:'850px' }}>
<ToastContainer />
  
<thead>
 <tr>
  <th>Id</th>
  <th className='text-nowrap'>Nom du producteur</th>
  <th className='text-nowrap'>Email du producteur  </th>
  <th className='text-nowrap'>Ville du producteur  </th>
  <th className='text-nowrap'>Naissance du producteur  </th>
  <th className='text-nowrap'>Supprimer producteur</th>
 </tr>
</thead>
<tbody>
 {producers.map(p=>(
    <tr className="bg-base-200">
    <td  >{ p.id}</td>
    <td style={{ color:'black' }} >{ p.name }</td>
    <td>{ p.email }</td>
    <td>{ p.ville }</td>
    <td>{ p.naissance }</td>
    <td> <button style={{ backgroundColor:'red',borderRadius:'8px' }} onClick={()=>supprimerProducteurs(p.id)}>Supprimer</button> </td>
 </tr>
 ))}
  
 

</tbody>
</table>
</div>
  </div>
  )
}
