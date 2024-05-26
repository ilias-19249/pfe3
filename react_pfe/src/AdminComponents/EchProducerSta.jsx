import axios from 'axios'
import React, { useEffect, useState } from 'react'

    import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function EchProducerSta() {
    const [res,setRes]=useState([])
    const getData=async ()=>{
    const data=await axios.get('http://localhost:8000/admin/statistiquesFavorabilites');
   setRes(data.data.result)
    }
    useEffect(()=>{
    getData();
    },[])  
  
    return (
      <div>
        <h6 style={{ color:'black',position:'absolute',right:'-67rem',top:'26.5rem',whiteSpace:'nowrap' }}>L'état des échantillons des producteurs</h6>
      <ResponsiveContainer width="150%" height={320} style={{ position:'absolute',left:'63rem',top:'28rem' }}>
        <BarChart
          data={res}
          margin={{
            top: 5,
            right: 50,
            left: 20,
            bottom: 5,
          }}
        >
           
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="producteur_name" />
          <YAxis tick={{ fontSize: '12px' }} orientation="left" />
          <Tooltip />
          <Legend />
          <Bar dataKey="fav" fill="#8884d8" style={{ marginBottom:'15rem' }} />
          <Bar dataKey="defav" fill="#82ca9d" orientation="left" />
          <Bar  dataKey="encours" fill="#2ca02c" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    
  )
}
