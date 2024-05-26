import React from 'react'
import {  Route, Routes } from "react-router-dom"
import Main from '../ProducerDashboard/Main';
// import Echanntillon from '../ProducerComponents/Echanntillon';
import Echs from '../ProducerPages/Echs';
// import Produits from '../UserPages/Produits';
import StockManagement from '../ProducerPages/StockManagement';
import Orders from '../ProducerPages/Orders';
import Statistiques from '../ProducerPages/Statistiques';

export default function ProducerRoutes() {
  return (
    <div>
        <Routes>
             <Route path="/producer" element={<Main />} />
             <Route path="/producer/echantillons" element={<Echs />} />
             <Route path="/producer/Stock" element={<StockManagement />} />
             <Route path="/producer/Commandes" element={<Orders />} />
             <Route path="/producer/statistiques" element={<Statistiques />} />
        </Routes>
        
    </div>
     
       
   
  )
}
