import React,{useEffect, useState} from 'react'
import axios from 'axios';
export default function NavbarProducts() {
    const [produits,setProduits]=useState([]);
   const getProducts = async ()=>{
    try{
      const data=await axios.post('http://localhost:8000/afficherProduits');
      console.log(data.data);
      setProduits(data.data.produits);
    }catch(e){
      console.log(e);
             }
    }
    useEffect(()=>{
   getProducts();
    },[])
  return (
    <>
      {produits.map((produit)=>(
      <div key={produit.id}>
    <div class="product-card" >
    <img src="..." alt="ilias" />
    <h4>{produit.titre}</h4>
    <div>
        <span>{produit.quantite}</span>
        <form>
          <button type='submit'> + </button>
        </form>
        
    </div>
</div>
   </div>
    ))}
    </>
  )
}
