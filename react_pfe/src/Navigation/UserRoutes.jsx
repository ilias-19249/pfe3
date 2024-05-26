import React from 'react'
import Login from '../Login/Login';
import {Route,Routes} from "react-router-dom"
import Produits from '../UserPages/Produits';
import Panier from '../UserPages/Panier';
// import Navbar from '../UserComponents/Navbar';
import DetailsProduit from '../UserPages/DetailsProduit';
import Commandes from '../UserPages/Commandes';
import Facturation from '../UserPages/Facturation';
import Dashboard from '../AdminDashboard/Dashboard';
import Navbar from '../UserComponents/Navbar';
import DisplayTests from '../AdminPages/DisplayTests';
import Main from '../UserPages/Main';
import SuiviCommandes from '../UserPages/SuiviCommandes';
import Acceuil from '../ProducerDashboard/Acceuil';
import Messages from '../UserPages/Messages';

export default function UserRoutes() {
  // <Navbar />
  
  return (
    <div>
      <Routes>
        <Route path='/' exact element={<Acceuil />} />
        <Route path='/Acceuil' exact element={<Acceuil />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/produits' element={<Produits />} />
        <Route path='/suiviCommandes' element={<SuiviCommandes />} />
        <Route path='ajouterPanier:id' element={<Panier />} />
        <Route path='produits/Panier' element={<Panier />} />
        <Route path='Details/:id' element={<DetailsProduit />} />
        <Route path='Produits/Commandes' element={<Commandes />} />
        <Route path='Produits/Commandes/Facturation/:id' element={<Facturation />} />
        <Route path='ech/tests/:id' element={<DisplayTests/>} />
        <Route path='messages' element={<Messages/>} />
      </Routes>
    </div>
  )
}
