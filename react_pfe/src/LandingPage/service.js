import React from 'react';
import { useSpring, animated } from 'react-spring'; 
import './services.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Imageservice from '../assets/service6.png';
import { 
  faMapMarkerAlt, 
  faShieldAlt, 
  faCheckCircle, 
  faCertificate, 
  faBell, 
  faChartBar 
} from '@fortawesome/free-solid-svg-icons';

export default function Service() {
  const containerAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={containerAnimation}>
    <section id="Service-section">
   <div>
     <h1 className="page-title"><span>Nos</span> Services</h1>
     <p className="paragraph">Trouvez la solution parfaite à vos besoins en explorant nos services dès maintenant.</p>
     <div className="services-container">
       <div className="services-column">
         <animated.div className="service-card" style={containerAnimation}>
           <FontAwesomeIcon icon={faMapMarkerAlt} className="service-icon" />
           <div className="service-title">Traçabilité complète</div>
           <div className="service-description">Suivez facilement l'origine et le parcours complet de chaque produit agricole.</div>
         </animated.div>
         <animated.div className="service-card" style={containerAnimation}>
           <FontAwesomeIcon icon={faShieldAlt} className="service-icon" />
           <div className="service-title">Transparence totale</div>
           <div className="service-description">Assurez une transparence totale en permettant aux consommateurs d'accéder aux informations détaillées.</div>
         </animated.div>
         <animated.div className="service-card" style={containerAnimation}>
           <FontAwesomeIcon icon={faCheckCircle} className="service-icon" />
           <div className="service-title">Sécurité alimentaire</div>
           <div className="service-description">Garantissez la sécurité alimentaire en offrant un système de suivi fiable.</div>
         </animated.div>
       </div>
       <img className="separator-image" src={Imageservice} alt="Separator" />

       <div className="services-column">
         <animated.div className="service-card" style={containerAnimation}>
           <FontAwesomeIcon icon={faCertificate} className="service-icon" />
           <div className="service-title">Gestion des stocks</div>
<div className="service-description">Optimisez votre gestion de stocks grâce à un suivi en temps réel et des outils d'analyse avancés.</div>

         </animated.div>
         <animated.div className="service-card" style={containerAnimation}>
           <FontAwesomeIcon icon={faBell} className="service-icon" />
           <div className="service-title">Alertes en temps réel</div>
           <div className="service-description">Recevez des alertes en temps réel concernant toute anomalie détectée.</div>
         </animated.div>
         <animated.div className="service-card" style={containerAnimation}>
           <FontAwesomeIcon icon={faChartBar} className="service-icon" />
           <div className="service-title">Analyse des données</div>
           <div className="service-description">Profitez d'outils d'analyse avancés pour exploiter les données recueillies.</div>
         </animated.div>
       </div>
     </div>
   </div>
   </section>
 </animated.div>
    
  );
}
