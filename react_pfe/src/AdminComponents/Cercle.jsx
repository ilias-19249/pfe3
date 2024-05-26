import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto' 
import axios from 'axios'


export function Cercle() {
    const chartRef=useRef(null);
    const chartInstance=useRef(null);

const Piechart =async()=>{
    const data=await axios.post('http://localhost:8000/admin/reussite_echs');
    if(chartInstance.current){
        chartInstance.current.destroy()
       }
       const myChartRef=chartRef.current.getContext('2d');

       chartInstance.current=new Chart(myChartRef,{
        type:"pie",
        data:{
            labels:["avis favorable ","avis défavorable"],
            datasets:[
                {
                    data:[data.data.fav.length,data.data.defav.length],
                    backgroundColor:[
                        'rgb(12,56,15)',
                        'rgb(48,152,42)'
                    ],

                }
            ]
        }, options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Taux de réussite des échantillons',
                    padding: {
                        top: 15,
                        bottom: 2
                    }
                }
            }
        }

       })
       return ()=>{
        if(chartInstance.current){
            chartInstance.current.destroy()
        }
       } 
    
}
     useEffect(()=>{
            Piechart()

     },[])

  return (
    <div style={{ marginRight:'16rem', }}>
    <canvas ref={chartRef} style={{ width:'450px', height:'450px' }} />
    </div>
  )
}
