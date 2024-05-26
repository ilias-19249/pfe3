import React, { useEffect } from 'react'
import BonneCmdSta from '../ProducerComponents/BonneCmdSta'
import { useNavigate } from 'react-router-dom';

import Main from '../ProducerDashboard/Main'
import StatisticByPeriod from '../ProducerComponents/StatisticByPeriod'
import EchantillonsExam from '../ProducerComponents/EchantillonsExam'
import SatisfactionClients from '../ProducerComponents/SatisfactionClients'

export default function Statistiques() {
  const navigate = useNavigate();

  const checkLogin=()=>{
    const verify=localStorage.getItem('producer_authentication')
    if(!verify){
      navigate('/')
    }
}
useEffect(()=>{
checkLogin()
},[])
  return (
    <div>
        <Main />
        {/* <br /> */}
        {/* <br /> */}
      <StatisticByPeriod />
      {/* <br></br> */}
      <br />
      <br />
      {/* <br /> */}
      <EchantillonsExam />
      <SatisfactionClients />
      <BonneCmdSta />

    </div>
  )
}
