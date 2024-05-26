import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

export default function ConsulterTests() {
    const [tests, setTests] = useState([]);
  
    const getTests= async ()=>{
     const data=await axios.post('http://localhost:8000/admin/AfficherTests');
     setTests(data.data.tests);
     console.log(data.data.tests);
    }
    useEffect(()=>{
   getTests();
    },[])
  return (
    <div>
      <div className="overflow-x-auto" style={{ marginLeft:'-110px' , position:'absolute',top:'3rem',left:'33rem' }}>
        <h2 style={{ color:'black',textAlign:'center' }}>Tests</h2>
<table  style={{ width:'850px' }}>
    
 <thead>
   <tr>
    <th>Id</th>
    <th>Nom du test</th>
    <th>Description du test  </th>
    <th>La date du test</th>
   </tr>
</thead>
 <tbody>
   {tests.map(p=>(
      <tr key={p.id} className="bg-base-200">
      <td  >{ p.id}</td>
      <td style={{ color:'black' }} >{ p.nom }</td>
      <td>{ p.description }</td>
      <td className='text-nowrap'>{format(new Date(p.created_at), 'yyyy-M-dd HH-mm-ss')}</td>
   </tr>
  ))}
    
  </tbody>
</table>
</div>
    </div>
  )
}
