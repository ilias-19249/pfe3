import React from 'react';
import './contact.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';



export default function Contact() {
  return (
    <section id="Contact-section1">
    <section id="section-wrapper11" className="fade-in1">
      <div className="containers11">
        <div className="contents11">
          <div className="left-side11">
            <div className="phone details11">
              <FontAwesomeIcon icon={faPhoneAlt} />
              <div className="topic11">Téléphone</div>
              <div className="text-one11">+212 609873059</div>
            </div>
            <div className="email details1">
              <FontAwesomeIcon icon={faPaperPlane} />
              <div className="topic11">Email</div>
              <div className="text-two11">chaimaa@gmail.com</div>
            </div>
          </div>
          <div className="right-side11">
            <div className="topic-text1">Envois nous un message</div>
            <p>Pour toutes questions ou collaborations, contactez-nous. Nous sommes là pour vous</p>
            <form action="#">
              <div className="input-box11">
                <input type="text" placeholder="Prenom" />
              </div>
              <div className="input-box11">
                <input type="text" placeholder="Nom" />
              </div>
              <div className="input-box11">
                <input type="text" placeholder="Téléphone" />
              </div>
              <div className="input-box11">
                <input type="text" placeholder="Email" />
              </div>
              <div className="input-box1 message-box11">
                <textarea name="message" id="" placeholder="Ecris ton message"></textarea>
              </div>
              <div className="button21">
                <input type="button" value="Envoyer" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section></section>
  );
}
