import React from 'react'
import {BrowserRouter} from "react-router-dom"
import UserRoutes from './UserRoutes';
import AdminRoutes from './AdminRoutes';
import ProducerRoutes from './ProducerRoutes';

export default function Navigation() {
  return (
    <BrowserRouter>
       <AdminRoutes />
      <ProducerRoutes />
       <UserRoutes />
    </BrowserRouter>
     
  )
}
