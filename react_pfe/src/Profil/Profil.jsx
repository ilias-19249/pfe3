import React from 'react'
import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { authContext } from "../helpers/authContext";
export default function Profil() {
  const {logged,setLogged}=useContext(authContext);
  const {user,setUser}=useContext(authContext);
  const navigate=useNavigate();

  useEffect(()=>{
    checkLogin();
  },[]);
  

  const checkLogin =()=>{
    if(!localStorage.getItem('userToken')){
      setLogged(false);
      navigate('/login')
      console.log('you are not  connected');
    }
  }
  return (
    
    <div>
      hello , you are  authenticated
    </div>
  )
}
