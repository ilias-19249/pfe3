import React, { useEffect, useState } from 'react';
import '../LandingPage/Navbar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faEnvelope, faLock, faSignInAlt, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
  const naviagte=useNavigate();

  const logout=()=>{
    localStorage.clear();
    naviagte('/')
  }


  return (
    <div>
      <nav className="navbar" style={{ backgroundColor:'#01382e' }}>
        <div className="logo-container">
        </div>
        <div className="links-container">
          <a href="#s" > <Link to={'/produits'}>Produits</Link> </a>
          <a href="s#" ><Link to={'/produits/panier'}>Panier</Link> </a>
          <a href="#s"  ><Link to={'/suiviCommandes'}>Suivi</Link></a>  
          <a href="#s" ><Link to={'/Produits/Commandes'}>Commandes</Link></a>
        <FontAwesomeIcon style={{ position:'absolute',right:'1.5rem',top:'1.4rem' }} onClick={()=>logout()} size='2x' icon={faSignOutAlt} />
        </div>
    </nav>
</div>
  );
}
