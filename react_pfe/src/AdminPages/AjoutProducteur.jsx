import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function AjoutProducteur() {
    const [nom,setNom]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [ville,setVille]=useState('');
    const [naissance,setNaissance]=useState('');

    const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(nom,ville,email,password,naissance);
    const data=await axios.post('http://localhost:8000/producer/register',{
     'name':nom,
     'email':email,
     'password':password,
     'ville':ville,
     'naissance':naissance
    });
    toast.success('Un producteur  est ajouté avec succes !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      };
      return (
    <div>
      <ToastContainer />
      <form style={{ position:'absolute',top:'0',left:'35rem',width:'30rem' }}>
      <h1 className='text-dark' >Ajouter un producteur</h1>

  <div class="mb-3">
    <label for="nom" class="form-label">Nom</label>
    <input type="text" class="form-control" onChange={(e)=>setNom(e.target.value)} id="nom" name="nom" required />
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" onChange={(e)=>setEmail(e.target.value)} id="email" name="email" required />
  </div>
  <div class="mb-3">
    <label for="ville" class="form-label">Mot de passe</label>
    <input type="password" class="form-control" onChange={(e)=>setPassword(e.target.value)} id="ville" name="ville" required />
  </div>
  <div class="mb-3">
    <label for="adresse" class="form-label">Ville</label>
    <input type="text" class="form-control" onChange={(e)=>setVille(e.target.value)} id="adresse" name="adresse" required />
  </div>
  <div class="mb-3">
    <label for="motDePasse" class="form-label">Naissance </label>
    <input type="date" class="form-control"  id="motDePasse" onChange={(e)=>setNaissance(e.target.value)} name="motDePasse" required />
  </div>
  <button type="submit" onClick={(e)=>handleSubmit(e)}  class="btn btn-primary" style={{ marginLeft:'260px',marginTop:'-0rem' }}>Soumettre</button>
</form>

    </div>
  )
}
    
  
