import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from './../UserComponents/Navbar';

export default function Messages() {
  const [Lu,setLu]=useState([]);
  const [Nonlu,setNonlu]=useState([]);

  const id=localStorage.getItem('user_id');
  // const LastSeen=async ()=>{
    // const data=await axios.post(`http://localhost:8000/last_seen/${id}`)
  //  }
   const getMessages=async ()=>{
    const data=await axios.get(`http://localhost:8000/getMessages/${id}}`);
    setLu(data.data.lus);
    setNonlu(data.data.non_lus)
    setTimeout(async () => {
    const data2 = await axios.post(`http://localhost:8000/last_seen/${id}`)

    }, 2000);

   }
   useEffect(()=>{
   getMessages();
  //  LastSeen();
   },[])

  return (
    <div>
        <Navbar />
        <h1>message lu</h1>
        
        {Lu.map((p)=>(
           <h1> {p.message} </h1>
        ))}

        <h1>message non lu</h1>
        <div style={{ backgroundColor:'#FFF' }}>
           {Nonlu.map((p)=>(
           <h1> {p.message} </h1>
        ))}
        </div>
       

      
    </div>
  )
}
