import React from 'react';
import { useSpring, animated } from 'react-spring'; 
import './about.css'; 
import Imageabout from '../assets/about1.jpeg';

export default function AboutUs() {
  const circleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  const textAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(-50px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { duration: 1000 },
  });
 
  return (
    <section id="about-section">
    <div id="container">
      <animated.div className="imageleft" style={circleAnimation}>
        <div className="circle">
          <img src={Imageabout} alt="Image" />
        </div>
      </animated.div>
      <animated.div id="paragrapheright" style={textAnimation}>
        <h1 className="page-title">
          <span>A</span>boutUs
        </h1>
        <p>
          Notre application assure la traçabilité complète des produits agricoles, garantissant transparence et sécurité alimentaire. Avec
          des fonctionnalités telles que la certification des producteurs, les alertes en temps réel et l'analyse des données, nous vous
          offrons une expérience fiable pour une alimentation sûre et transparente.
        </p>
      </animated.div>
    </div>
    </section>
  );
}
