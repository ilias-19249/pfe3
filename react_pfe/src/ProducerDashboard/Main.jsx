import React, { useEffect } from 'react'
import './Main.css'
import  {Link}  from 'react-router-dom';
import Statistiques from './../AdminPages/Statistiques';
import Arber from '../LandingPage/arber.js'
import AboutUs from '../LandingPage/about.js'
import { useNavigate } from 'react-router-dom';
import CommonLayout from '../LandingPage/layout.js'
// import Service from '../LandingPage/'
export default function Main() {
    const navigate = useNavigate();
    const Signout=()=>{
        localStorage.clear();
        navigate('/Acceuil');
    }
  return (
    <div>
       <div class="ProducerContainer">
        <div class="navigation">
            <ul>
                <li>
                    <a href="#s">
                        <span class="icon">
                            <ion-icon name="logo-apple"></ion-icon>
                        </span>
                        <span class="title">Producteur </span>
                    </a>
                </li>

                <li>
                    <a href="s#">
                        <span class="icon">
                            <ion-icon name="home-outline"></ion-icon>
                        </span>
                        <span class="title"> <Link to={'/producer/echantillons'}>Suivi état échantillon</Link> </span>
                    </a>
                </li>

                <li>
                    <a href="s#">
                        <span class="icon">
                            <ion-icon name="home-outline"></ion-icon>
                        </span>
                        <span class="title"> <Link to={'/producer/Stock'}> Gérer stock</Link></span>
                    </a>
                </li>

                <li>
                    <a href="s#">
                        <span class="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span class="title"> <Link to={'/producer/Commandes'} >Commandes</Link> </span>
                    </a>
                </li>
                <li>
                    <a href="s#">
                        <span class="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span class="title"> <Link to={'/producer/statistiques'} >Statistiques</Link> </span>
                    </a>
                </li>
                 <li style={{ position:'absolute', bottom:'-25rem' }}>
                    <a >
                        <span class="icon">
                            <ion-icon name="log-out-outline"></ion-icon>
                        </span>
                        <span onMouseLeave={(e) => e.target.style.color = 'white'} onMouseEnter={(e) => e.target.style.color = 'black'} class="title" style={{ color:'white' }} onClick={()=>Signout() } >Se déconnecter</span>
                    </a>
                </li>
                
            </ul>
        </div>
    </div>
  
    </div>
  )
}
