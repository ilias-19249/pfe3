import React, { useEffect, useState } from 'react'
import './DProduit.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DProduit() {
  const [produit,setProduit]=useState({});
  const [quantite,setQuantite]=useState();
  const {id}=useParams();
  const getProduitInfos =async ()=>{
    const data= await axios.post(`http://localhost:8000/afficherProduit/${id}`);
    setProduit(data.data.produits[0]);
  }
  const Commander= async ()=>{
    const user_id=localStorage.getItem('user_id');
    // console.log(quantite,produit.reference);
    const statut = await axios.post(`http://localhost:8000/commander/${user_id}`,{
      'produit_id':produit.reference,
      'producteur_id':produit.producteur_id,
      'quantite': quantite,
      'prix_total':quantite * (produit.price)
    });
    toast.success('Votre commande a été bien passée!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    
  }
  const handleQuantiteChange=(e)=>{ 
    console.log(e.target.value); 
setQuantite(e.target.value);
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    Commander();
  }
  useEffect(()=>{
    getProduitInfos();
  },[])


  return (
  <div> 
 <ToastContainer />
      {/* <div className="product-container">
      <img className="product-image" src="product-image.jpg" alt=" lslck" />
      <h2 className="product-title">{produit.titre}</h2>
      <p className="product-description"> {produit.description}</p>
      <p className="product-price">{produit.prix} DH</p>

      <form className="order-form" onSubmit={handleSubmit}>
        <input name='quantite' className="quantity-input" type="number"  min="1" max="10" onChange={handleQuantiteChange}/>
        <button className="order-button" type="submit">Order Now</button>
      </form>
    </div> */}
     {/* <div class="row row-cols-1 row-cols-md-3 g-4 py-5"> */}

<div class="col">
<section class="py-5" > 
  <div class="container">
    <div class="row gx-5">
      <aside class="col-lg-6">
        <div class=" mb-3 d-flex justify-content-center">
          <a data-fslightbox="mygalley" class="rounded-4"  data-type="image" href='r'>
            <img style={{maxWidth: '100%', maxHeight: '100vh', margin: 'auto'}} class="rounded-4 fit" src={produit.image} alt='cdf' />
          </a>
        </div>
        
        
      </aside>
      <main class="col-lg-6">
        <div class="ps-lg-3">
          <h4 class="title text-dark" style={{ marginLeft:'15rem' }}>
            Nom du produit : {produit.nom}
          </h4>
          

          <div class="mb-3" style={{ marginLeft:'20rem' }}>
            <span class="h5">{produit.price} DHs </span>
          </div>

        

          <div class="row">
            <div className='d-flex gap-5'>
               <dt class="col-3" style={{ whiteSpace:'nowrap' }}>Quantité disponible : </dt>
               <dd class="col-9 ml-5" style={{    }}>{produit.pQte}</dd>
            </div>
           
           <div className='d-flex gap-5'>
             <dt class="col-3" style={{ whiteSpace:'nowrap' }}>Nom du producteur : </dt>
            <dd class="col-9">{produit.name}</dd>
           </div>
           
            <div className='d-flex gap-5'>
              <dt class="col-3">Catégorie : </dt>
            <dd class="col-9">{produit.category}</dd>
            </div>
            
             <div className='d-flex gap-5'>
              <dt class="col-3">Origine : </dt>
            <dd class="col-9">{produit.origine}</dd>
             </div>
            
              <div className='d-flex gap-5'>
                <dt class="col-3" style={{ whiteSpace:'nowrap' }}>Date de production : </dt>
            <dd class="col-9">{produit.date_production}</dd>

              </div>
            
            <div className='d-flex gap-5'>
               <dt class="col-3" style={{ whiteSpace:'nowrap' }}>Date d'éxpiration</dt>
            <dd class="col-9">{produit.date_expiration}</dd>
            </div>
           
             <div className='d-flex gap-5'>
              <dt class="col-3">Ingrédients : </dt>
            <dd class="col-9">{produit.ingrédients}</dd>
             </div>
            
             <div className='d-flex gap-5'>
               <dt class="col-3">Stockage : </dt>
            <dd class="col-9">{produit.stockage}</dd>
             </div>
           

           
          </div>

          <hr />

          <div class="row mb-4">
            
            <div class="col-md-4 col-6 mb-3">
              <label class="mb-2 d-block">Quantité</label>
              <div class="input-group mb-3" style={{width:'170px'}}>
                <input onChange={(e)=>handleQuantiteChange(e)} type="text" class="form-control text-center border border-secondary"  aria-label="Example text with button addon" aria-describedby="button-addon1" />
                
              </div>
            </div>
          </div>
          <a href="d" class="btn btn-primary shadow-0" onClick={(e)=>handleSubmit(e)} style={{ position:'absolute',right:'1.5rem',bottom:'8.8rem' }}> Commander </a>
        </div>
      </main>
    </div>
  </div>
</section>
</div>

    </div>
  )
}
