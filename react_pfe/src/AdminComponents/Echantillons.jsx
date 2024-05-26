import React, { useEffect, useState } from 'react'
import './Echantillons.css'
import {Link} from 'react-router-dom'
import axios from 'axios';

export default function Echantillons() {
const [Echantillons,setEchantillons]=useState([])

    const getEchantillons= async()=>{
     const data=await axios.post('http://localhost:8000/admin/Echantillons');
     console.log(data.data.echans);
     setEchantillons(data.data.echans);
    }

    useEffect(()=>{
    getEchantillons();
    },[])
  return (
    <div className="sample-table-container" style={{ marginLeft:'-7rem' }}>
        <h1 style={{ color:'black',marginLeft:'53rem',marginTop:'1rem' }}> Echantillons </h1>
      <table className='table' style={{ marginTop:'-23rem',marginLeft:'34rem' }}>
        <thead>
          <tr style={{ backgroundColor:'' }}>
            <th>ID</th>
            <th>Nom</th>
            <th style={{ whiteSpace:'nowrap' }}>Date de Prélèvement</th>
            <th style={{ whiteSpace:'nowrap' }}>État Examen</th>
            <th>Test Uni</th>
            <th style={{ whiteSpace:'nowrap' }}>Nom du  Producteur </th>
            <th style={{ whiteSpace:'nowrap' }}>Consulter Tests </th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor:'black',color:'white' }}>
          {Echantillons.map(ech => (
            <tr key={ech.id} className="bg-base-200">
              <td>{ech.id}</td>
              <td>{ech.nom}</td>
              <td>{ech.date_prelevement}</td>
              <td>{ech.res_final === 1 && 'Favorable' }
              {ech.res_final === 0 && 'Défavorable' }
              {ech.res_final === 9 && 'En cours' }</td>
              <td> <button className='btn btn-primary text-nowrap'> <Link style={{ color:'white',textDecoration:'none' }} to={`donnerTest/${ech.id}`}>Examiner Test</Link> </button>  </td>
              <td>{ech.name}</td>
              <td><button className='btn btn-primary'><Link className='text-light text-nowrap text-decoration-none' to={`/admin/ech/tests/${ech.id}`}>Consulter Tests</Link></button> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
