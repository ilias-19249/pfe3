import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function StatisticByPeriod() {
    const [selectBy,setSelectBy]=useState('');
    const [data,setData]=useState([])
    const [year,setYear]=useState('')
    const [years,setYears]=useState([])

   const handleYear= async (p)=>{
      setYear(p);
      console.log(p);
      try{
        const data=await axios.get(`http://localhost:8000/producer/staticticsByMonth/${selectBy}`, {params: {
         year: p
       }})
        setData(data.data.result);
        console.log(data.data.result,p,year);
       
             }catch(e){
              console.log(e);
             }
   }
   const getYears = async ()=>{
    const data =await axios.get('http://localhost:8000/producer/years');
    setYears(data.data.years)
   }

   useEffect(()=>{
     getYears()
   },[])


    const selectByChange =async (p)=>{
    setSelectBy(p);
     try{
 const data=await axios.get(`http://localhost:8000/producer/staticticsByMonth/${p}`, {params: {
  year: year
}})
 setData(data.data.result);
 console.log(data.data.result,p,year);

      }catch(e){
       console.log(e);
      }
    }

  return(
    <div>
      <h6 style={{ position:'absolute',right:'26rem' }}>Le nombre des commandes par (An/Mois)</h6>
        <div className='d-flex'>
          <select onChange={(e)=>{selectByChange(e.target.value)}} style={{ marginLeft:'54rem',marginTop:'2rem' }}>
            <option value=""></option>
            <option value="m">par mois</option>
            <option value="y">par année</option>
        </select>
        {selectBy ==='m' &&  <select onChange={(e)=>{handleYear(e.target.value)}} style={{ marginLeft:'1rem',marginTop:'2rem' }}>
            {/* <option value=""></option> */}

            { years.map((p)=>(
              <option value={p}>{p}</option>
            )) }
            
        </select>}
       
        </div>
        
        <ResponsiveContainer title="" width="80%" height={320} style={{ position:'absolute',left:'20rem',top:'4rem' }}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 50,
            left: 20,
            bottom: 5,
          }}
        >
           
          <CartesianGrid strokeDasharray="3 3" />
          { selectBy === 'y' && <XAxis dataKey="year_name" /> }
          { selectBy === 'm' && <XAxis dataKey="month_name" /> }
          <YAxis tick={{ fontSize: '12px' }} orientation="left" />
          <Tooltip />
          <Bar dataKey="total des commandes" fill="#8884d8"  />
        </BarChart>
      </ResponsiveContainer>

      
    </div>
  )
}
