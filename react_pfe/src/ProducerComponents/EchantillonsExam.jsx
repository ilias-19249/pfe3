import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto' 
import axios from 'axios'

export default function EchantillonsExam() {
    const chartRef=useRef(null);
    const chartInstance=useRef(null);

    const Piechart =async()=>{
        const id = localStorage.getItem('producer_id');
        const data=await axios.get(`http://localhost:8000/producer/staticticsEchantillons/${id}`);
        if(chartInstance.current){
            chartInstance.current.destroy()
           }
           const myChartRef=chartRef.current.getContext('2d');
    
           chartInstance.current=new Chart(myChartRef,{
            type:"pie",
            data:{
                labels:["avis favorable ","avis défavorable","en cours"],
                datasets:[
                    {
                        data:[data.data.fav,data.data.defav,data.data.encours],
                        backgroundColor:[
                            'rgb(152,56,15)',
                            'rgb(12,56,15)',
                            'rgb(48,152,42)'
                        ],
    
                    }
                ]
            }, options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Taux de réussite de tes échantillons',
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
    <div style={{ width: '25rem', height: '25rem',marginLeft:'19rem',marginTop:'19rem' }}>
    <canvas ref={chartRef}   />
    </div>
  )
}
