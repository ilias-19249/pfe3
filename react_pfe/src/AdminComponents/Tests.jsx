import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import './Tests.css'

export default function Tests() {
    const {id}=useParams();
    const [data,setData]=useState([{}]);
    const getData = async ()=>{
    const data=await axios.get(`http://localhost:8000/admin/consulterResTests/${id}`);
    setData(data.data.tests)
    }
    useEffect(()=>{
      getData();
    },[])

  return (
    <div >
        <h1 style={{ color:'black',marginLeft:'41rem',position:'absolute',top:'2rem',whiteSpace:'nowrap' }}>Les résultats d'échantillon : </h1>
      <table class="table" style={{ color:'blue',position:'absolute' , marginLeft:'560px',marginTop:'-350px' , width:'40rem' }}>
  <thead>
    <tr>
      <th scope="col">Nom d'échantillon</th>
      <th scope="col">Nom tu test</th>
      <th scope="col">Résultat</th>
    </tr>
  </thead>
  <tbody>
    {data.length === 0 ? 'il y a pas des tests pour cet échantillon' :  data.map(p=>(
      <tr>
      <th scope="row">{p.ech_nom}</th>
      <td>{p.test_nom}</td>
      <td>{p.res_test===1? 'Favorable' : 'Défavorable' }</td>
    </tr>
    )) }
   

    
  </tbody>
</table>
    </div>
  )
}
