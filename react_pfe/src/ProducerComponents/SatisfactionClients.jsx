import React, { useEffect, useRef, } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default function SatisfactionClients() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const pieChart = async ()=>{
        const response = await axios.post('http://localhost:8000/admin/clientSatisfes');
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const myChartRef = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(myChartRef, {
            type: "pie",
            data: {
                labels: ["Clients satisfés", "Clients Désatisfés"],
                datasets: [
                    {
                        data: [response.data.sat.length, response.data.desat.length],
                        backgroundColor: [
                            'rgb(12,56,15)',
                            'rgb(48,152,42)'
                        ],
                    }
                ]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Satisfaction des clients',
                        padding: {
                            top: 17,
                            bottom: 0
                        }
                    }
                }
            }
        });
    }
    useEffect(() => {

pieChart();          
        
    }, []);

    return (
        <div style={{ width: '25rem', height: '25rem',marginLeft:'41rem',marginTop:'-25rem' }}>
            <canvas ref={chartRef}  />
        </div>
    );
}
