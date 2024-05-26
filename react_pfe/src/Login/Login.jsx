import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { authContext } from "../helpers/authContext";

export default function Login(){
  const {user,setUser}=useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin=async(e)=>{
e.preventDefault();
      if(email !== "" && password!==""){
        console.log(email,password);
      await axios.post('http://localhost:8000/login',{
        email:email,
        password:password
      })
      .then((res)=>{
        if(res.status === 200){
          localStorage.setItem('userToken',res.data.token);
          localStorage.setItem('user_id',res.data.user[0].id);
          setUser(res.data.user[0]);
        }
      })
      }else{

      }
}
useEffect(()=>{
  checkLogin();
},[]);

const checkLogin =()=>{
  if(localStorage.getItem('userToken')){
    console.log('you are connected');
  }
}


      return (
    <div className="body">
    <form onSubmit={handleLogin}>
        <div className="input-group">
         <label>Email </label> 
          <input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input autoComplete=""
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}