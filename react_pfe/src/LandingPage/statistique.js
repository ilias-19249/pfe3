import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './statistique.css';
import Imagestatistique from '../assets/statistique.png';
import Imagestatistique2 from '../assets/statistique2.png';

function StatSection() {
  const [showCard, setShowCard] = useState(false);

  
  const cardAnimation = useSpring({
    opacity: showCard ? 1 : 0,
    transform: showCard ? 'translateY(0)' : 'translateY(20px)',
    delay: 50 
  });

 
  useState(() => {
    const timeout = setTimeout(() => {
      setShowCard(true);
    }, 1000); 
    return () => clearTimeout(timeout);
  }, []);

  console.log("showCard:", showCard); 
  console.log("cardAnimation:", cardAnimation); 

  return (
    <section id="Statistique-section">
        <h1 className="page-title1">
          <span>S</span>tatistiques
        </h1>
      <div style={{ marginTop:'-3.5rem' }} className="stat-section">
    
        <div className="left-column">
          <animated.img src={Imagestatistique} style={cardAnimation} alt='' />
          <animated.img src={Imagestatistique2} style={cardAnimation} alt='' />
        </div>
        <div className="right-column">
          <animated.div className="statistics-rectangle" style={cardAnimation}>
            <h2>Statistiques</h2>
            <p>Nous sommes heureux de voir un taux de satisfaction client de 90%, et 76% du trafic sur notre site provient de clients satisfaits. Cela démontre notre engagement envers l'excellence et notre capacité à répondre efficacement aux besoins de notre clientèle.</p>
          </animated.div>
        </div>
      </div>
    </section>
  );
}

export default StatSection;
