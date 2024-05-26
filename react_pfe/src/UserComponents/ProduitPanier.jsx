import React,{ useEffect, useState }  from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProduitPanier() {
  const navigate = useNavigate();
  const [produits,setProduits]=useState([]);
   const getProducts = async ()=>{
    const id=localStorage.getItem('user_id');
    try{
      const data=await axios.post(`http://localhost:8000/afficherPanier/${id}`);
      // console.log(data.data);
      setProduits(data.data.products);
      

    }catch(e){
      console.log(e);
    }
   
   }
   const supprimerPanier =async (p)=>{
    console.log(p);
    const user_id=localStorage.getItem("user_id");
    const data =await axios.post(`http://localhost:8000/supprimerPanier/${p}`,{
      'user_id':user_id
    });

    toast.info('Produit est supprimé du panier !', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    getProducts();
   }
  //  const checkLogin=()=>{
  //   const verify=localStorage.getItem('user_authentication')
  //   if(!verify){
  //     navigate('/')
  //   }
  // }
   

   useEffect(()=>{
   getProducts();
  //  checkLogin();
   },[]);
  
  return (
    <div className="row gap-2" style={{ marginLeft:'130px',marginTop:'25px' }}> 
     {produits.map((produit)=>(
   <div class="card col-3">
  <img class="card-img-top" style={{ marginTop:'1rem' }} src={produit[0].image} alt={produit.image} />
  <div class="card-body">
    <h5 class="card-title">Nom du produit :  {produit[0].nom}</h5>
    <button type="button" class="btn btn-primary" onClick={() => supprimerPanier(produit[0].pid)}> Supprimer du panier</button>
  </div>
</div>
 ))} 
 

 
 

 
 <ToastContainer/>
    </div>

  
   
    
  )
}
