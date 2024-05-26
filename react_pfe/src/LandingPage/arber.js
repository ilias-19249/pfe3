import React from "react";
import { motion } from "framer-motion";
import './arber.css';

export default function Arber() {
  return (
    <>
   <section id="Parcours-section">
      <section className="timeline-section" style={{ position:'absolute', top:'743px',left: '200px' }}>
        <h1 className='timeline-title'><span>Le Parcours</span> de nos produits </h1>
        <div className="timeline-items"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">Production</div>
            <div className="timeline-content">

              <p>Cultiver des cultures ou élever des animaux avec des soins appropriés, y compris la préparation du sol, l'irrigation, la fertilisation et la protection contre les ravageurs.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">Récolte ou élevage</div>
            <div className="timeline-content">

              <p>Récolter les cultures au moment optimal de maturité ou abattre les animaux de manière sûre et efficace. </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">Conditionnement et transformation</div>
            <div className="timeline-content">

              <p>Nettoyer, trier et conditionner les produits pour assurer leur qualité et leur sécurité alimentaire. Possibilité de les transformer en produits finis selon les besoins. </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">Distribution</div>
            <div className="timeline-content">

              <p>Transporter les produits vers les marchés locaux, régionaux ou internationaux, en veillant à maintenir leur fraîcheur et leur qualité pendant le transport. </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">Commercialisation et consommation</div>
            <div className="timeline-content">

              <p> Présenter les produits aux consommateurs, promouvoir leur vente, effectuer des transactions commerciales et permettre la consommation par les individus ou les familles.</p>
            </div>
          </div>

        </div>
      </section>
      </section>
    </>
  )
}
