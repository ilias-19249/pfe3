import {Route,Routes} from "react-router-dom"
import React from 'react'
import Dashboard from "../AdminDashboard/Dashboard"
import AddTest from "../AdminComponents/AddTest";
import Echans from "../AdminPages/Echns";
import Test from '../AdminPages/Test';
import AjoutEchantillon from './../AdminPages/AjoutEchantillon';
import DisplayTests from "../AdminPages/DisplayTests";
import Statistiques from "../AdminPages/Statistiques";
import BonneCommandes from './../AdminPages/BonneCommandes';
import ConsulterTests from "../AdminPages/ConsulterTests";
import Producteurs from "../AdminPages/Producteurs";
import AjoutProducteur from "../AdminPages/AjoutProducteur";

export default function AdminRoutes() {
  return (
    <div>
         <Routes>
            <Route path="/admin" element={<Dashboard />}>
            {/* <Route path="" /> */}
            <Route path="AjoutTest" element={<AddTest />} />
            <Route path="Echantillons" element={<Echans />} />
            <Route path="AjoutEchantillon" element={ <AjoutEchantillon/> }/>
            <Route path='Echantillons/donnerTest/:id' element={<Test />}/>
            <Route path='Statistiques' element={ <Statistiques/> }  />
            <Route path="ech/tests/:id" element={<DisplayTests/>} />
            <Route path="BonnesCommandes" element={<BonneCommandes />} />
            <Route path="tests" element={< ConsulterTests />} />
            <Route path="producteurs" element={< Producteurs />} />
            <Route path="ajoutProducteur" element={< AjoutProducteur />} />
            
           </Route>
         </Routes>
    </div>
  )
}