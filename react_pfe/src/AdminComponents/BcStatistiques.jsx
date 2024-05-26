import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Chart } from 'chart.js/auto'
import { BarChart } from '@mui/x-charts/BarChart';

export default function BcStatistiques() {
   const [bonnes,setBonnes]=useState()
   const [mauvaise,setMauvaise]=useState()
   const [encours,setEncours]=useState()
    
  
   const getStatistiques=async ()=>{
    const data=await axios.get('http://localhost:8000/admin/bonneCommandeStatistiques');
    setBonnes(data.data.bonnes.length);
    setMauvaise(data.data.mauvaises.length);
    setEncours(data.data.encours.length);
   }
   useEffect(()=>{
    getStatistiques()
   },[])
  
  return ( 
    <div style={{position:'absolute',left:'15rem',top:'28rem'}}>
      <h6 style={{ color:'black', marginLeft:'11rem',position:'absolute' }}>L'état des commandes</h6>
      <BarChart
         title="état des commandes"
  xAxis={[
    {
      id: 'barCategories',
      data: ['Bonnes ', 'Mauvaises ', 'encours'],
      scaleType: 'band',
    },
  ]}
  series={[
    {
      data: [bonnes, mauvaise, encours],
    },
  ]}
  width={500}
  height={300}
/>
    </div>
  )
}
