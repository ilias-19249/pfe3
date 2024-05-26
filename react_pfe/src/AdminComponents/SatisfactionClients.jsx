import React, { useEffect, useRef, useState } from 'react';
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
                            top: 15,
                            bottom: 2
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
        <div>
            <canvas ref={chartRef} style={{ width: '500rem', height: '9000rem' }} />
        </div>
    );
}
