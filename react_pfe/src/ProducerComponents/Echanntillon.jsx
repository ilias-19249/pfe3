import React, { useState } from 'react'
// import Echantillons from './../AdminComponents/Echantillons';
import moment from 'moment';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Echanntillon() {
  const [showTests, setShowTests] = useState(false);
   const [echs,setEchs]=useState([]);
   const [res,setRes]=useState([]);
  const id=localStorage.getItem('producer_id');
  const getEchans = async ()=>{
      const data=await axios.post(`http://localhost:8000/producer/getEchantillons/${id}`);
      setEchs(data.data.ech);
  }
  useEffect(()=>{
getEchans();
  
  },[])
  const testsData = [
    { name: "Test 1", result: "Pass" },
    { name: "Test 2", result: "Fail" },
    { name: "Test 3", result: "Pass" }
  ];
  const handleShowTests =async (p) => {
    setShowTests(true);
    const id = localStorage.getItem('producer_id')
    const data=await axios.get(`http://localhost:8000/producer/détailsTests/${id}/${p}`);
    setRes(data.data.data);
  };


  return (
    <div>
      <h1 style={{ position:'absolute',top:'10px', textAlign:'center' ,left:'45rem',marginBottom:'20px' }}>Echantillons</h1>
      <div className="overflow-x-auto" style={{ marginLeft:'45px' }}>
  <table className="table" style={{ width:'1110px' , marginLeft:'20rem',marginTop:'5rem' }}>
    <thead>
      <tr>
        <th></th>
        <th>Nom</th>
        <th>Résultat</th>
        <th>Date du résultat</th>
        <th>Détails</th>
      </tr>
    </thead>
    <tbody>
      {echs.map(p=>(
        <tr className="bg-base-200">
        <th>{ p.id } </th>
        <td>{ p.nom}  </td>
        <td>{ p.res_final === 1 ? 'Favorable' : 'Défavorable' } </td>
        <td>{ moment(p.created_at).format('DD/MM/YY HH:mm')  } </td>
        <td> <button className='btn btn-success' onClick={()=>handleShowTests(p.id)}>Afficher les tests</button></td>
      </tr>
      ))}
      
    
    </tbody>
  </table>
  { showTests && <div className="rectangle text-dark" style={{ borderRadius:'15px' , backgroundColor:'#2a2185',position:'absolute',top:'0',marginLeft:'28rem',marginTop:'4rem',width:'52rem',height:'35rem',overflowY:'scroll' }}>
  <FontAwesomeIcon style={{ position:'absolute',right:'10px',top:'7px' }} icon={faTimes} className="close-icon text-light" onClick={() => setShowTests(false)} />
      <h1 style={{ textAlign:'center',color:'white' }}>Détails d'éxamination</h1>
      {res.map((test, index) => (
        <div key={index} style={{ marginLeft:'13rem',marginTop:'5rem' }} >
          <p style={{ fontWeight:'bolder' ,color:'white' }}>Le nom du test : {test.nomTest}</p>
          <p style={{ fontWeight:'bold',color:'white' }}>Résultat : {test.res_test===1 && 'favorable'}{test.res_test===0 && 'Défavorable'}</p>
          <p style={{ color:'white' }}>Description du test : {test.description}</p>

        </div>
      ))}
    </div> }
     
</div>
    </div>
  )
}
