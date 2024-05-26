import React from 'react'
import CommonLayout from '../LandingPage/layout.js'
import Arber from '../LandingPage/arber.js'
import Service from'../LandingPage/service.js';
import StatSection from '../LandingPage/statistique.js';
import Contact from '../LandingPage/contact.js';
import Footer from '../LandingPage/footer.js';
import FaqSection from '../LandingPage/faq.js'
import AboutUs from '../LandingPage/about.js'
export default function Acceuil() {
  return (
    <div>
      <CommonLayout  />
    <Arber />
    <AboutUs /> 
     <Service /> 
    <StatSection /> 
    <Contact />
    <FaqSection />
     <Footer /> 
    </div>
  )
}