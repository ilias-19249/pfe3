import React from 'react'
import { Cercle } from '../AdminComponents/Cercle';
import SatisfactionClients from './../AdminComponents/SatisfactionClients';
import BcStatistiques from './../AdminComponents/BcStatistiques';
import EchProducerSta from './../AdminComponents/EchProducerSta';

export default function Statistiques() {
  return (
    <div style={{ height:'27rem',width:'27rem',marginLeft:'15rem',marginTop:'-28.5rem', display:'flex'  }}>
      <Cercle  />
      <SatisfactionClients  />
      <BcStatistiques  />
      <EchProducerSta />
    </div>
  )
}

