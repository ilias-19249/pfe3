import React , { useState } from 'react'
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faUser, faCubes, faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Outlet,Link, useNavigate } from 'react-router-dom';
import Statistiques from './../AdminPages/Statistiques';

export default function Dashboard() {
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/Acceuil')
}

  return (
    <div className="sidebar" style={{ overflow:'visible' }}>
    <div className="sidebar-toggle">
      ☰
      <span> Admin </span>
    </div>
    <ul className="sidebar-menu">
      <li> <Link to={'AjoutTest'} style={{ color:'white', textDecoration:'none' }}>Ajouter Test</Link> </li>
      <li><Link style={{ color:'white', textDecoration:'none' }} to={'tests'}>Consulter tests</Link>  </li>
      <li>  <Link style={{ color:'white', textDecoration:'none' }} to={'AjoutEchantillon'}>Ajouter Echantillon</Link> </li>
      <li><Link style={{ color:'white', textDecoration:'none' }} to={'Echantillons'}>Echantillons</Link>  </li>
      <li><Link style={{ color:'white', textDecoration:'none' }} to={'Statistiques'}>Statistiques</Link>  </li>
      <li><Link style={{ color:'white', textDecoration:'none' }} to={'BonnesCommandes'}>Commandes</Link>  </li>
      <li><Link style={{ color:'white', textDecoration:'none' }} to={'ajoutProducteur'}>Ajouter Producteur</Link>  </li>
      <li><Link style={{ color:'white', textDecoration:'none' }} to={'producteurs'}>Producteurs</Link>  </li>
      
      
      <li style={{ position:'absolute',bottom:'0.7rem' }} onClick={()=>logout()} >Se déconnecter  </li>
      
    </ul>
      <Outlet />
  </div>
  )
}
