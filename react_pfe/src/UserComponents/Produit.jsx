import React,{ useEffect, useRef, useState }  from 'react'
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Link } from 'react-router-dom';
export default function Produit(){
  const [message,setMessage]=useState('');
  const [produits,setProduits]=useState([]);
   const getProducts = async ()=>{
    try{
      const data=await axios.post('http://localhost:8000/afficherProduits');
      setProduits(data.data.produits);
    }catch(e){
      console.log(e);
    }
   
   }
   const ajouterPanier=async (p)=>{
    const user_id=localStorage.getItem("user_id");
    const authToken = localStorage.getItem("userToken");
    console.log(authToken);
    const data =await axios.post(`http://localhost:8000/ajouterPanier/${p}`,{
      'user_id':user_id
    });
    toast.success('Porduit ajouté au panier avec succès!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
      });
    // setMessage('produit ajouté au panier');
    //     setTimeout(() => {
    //         setMessage('');
    //       }, 3000);
    // Navigate('produits/Panier');

   }
   

   useEffect(()=>{
   getProducts();
  //  checkLogin()
   },[]);
  //  const checkLogin=()=>{
  //   const verify=localStorage.getItem('user_authentication')
  //   if(!verify){
  //     navigate('/')
  //   }
  // }
  
  return (
//     <div style={{ display: 'flex', justifyContent: 'space-between' }}>  {produits.map((produit)=>(
//       <div key={produit.id}>
//     <div class="product-card" >
//     <img src="..." alt="ilias" />
//     <h4>Titre : {produit.titre}</h4>
//     <span> Quantité : {produit.quantite}</span>
//     <div>
//         <form onSubmit={(e)=>{
//           e.preventDefault();
//           ajouterPanier(produit.id);
          
//         }} style={{ width:'50px',marginLeft:'55px' }}>
//           <button type='submit'> + </button>
//           {/* <button type='submit'> <Link to="Panier">+</Link> </button> */}
//           {/* <Link >+</Link> */}
//         </form>
//         <Link to={`/Details/${produit.id}`} style={{ marginTop:'40px' }}>More</Link>
        
//     </div>
// </div>
//    </div>
//     ))}</div>
 <> 
 {/* {message && <h1> {message} </h1>} */}
 {produits.map((produit)=>(
//    <div class="card">
//     <img src={produit.image} alt="kj" />
//   {/* <img class="card-img-top" src="data:image/jpeg;base64,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" alt="ilias "/> */}
//   <div class="card-body">
//     <h5 class="card-title" style={{ color:'black' }}>Nom : {produit.nom} ({produit.pid})</h5>
//     <p class="card-text" style={{ color:'black' }}>Quantité : {produit.quantité}</p>
//     {/* {<p class="card-text" style={{ color:'black' }}>ingrédients  : {produit.ingrédients}</p>
//     <p class="card-text" style={{ color:'black' }}>catégorie   : {produit.category}</p>
//     <p class="card-text" style={{ color:'black' }}>Origine  : {produit.origine}</p>
//     <p class="card-text" style={{ color:'black' }}>conditions de stockage  : {produit.stockage} </p>
//     <p class="card-text" style={{ color:'black' }}>Date de production   :  {produit.date_production} </p>
//     <p class="card-text" style={{ color:'black' }}>Date d'éxpiration  : {produit.date_expiration}  </p>} */}
//     <div style={{ display:'flex' }}>
//       <button  type="button" class="btn  btn-primary" onClick={() => ajouterPanier(produit.pid)}>Ajouter au panier</button>
//     <button type="button" class="btn btn-primary"><Link to={`/Details/${produit.pid}`} style={{ color:'white',textDecoration:'none' }}>Détails produit </Link> </button>
 
//     </div>
//      </div>
// </div>
 <div class="card p-3 bg-white" style={{ marginTop:'2rem',marginLeft:'1rem', borderColor:'black'}}><i class="fa fa-apple"></i>
            <div class="about-product text-center mt-2"><img src={produit.image} alt='dfdf' style={{ width:'320px',height:'200px',marginTop:'1rem' }} width="300" />
                <div>
                    <h4>{produit.nom}</h4>
                    {/* <p class="mt-0 text-black-50">Apple pro display XDR</p> */}
                </div>
            </div>
            <div class="stats mt-2"  >
                <div class="d-flex justify-content-between p-price"><span >Prix</span><span style={{ color:'green' }}>{produit.prix} <b style={{ color:'green' }}>DHs</b> </span></div>
                <div class="d-flex justify-content-between p-price"><span>Quantité</span><span >{produit.quantité}</span></div>
                <div class="d-flex justify-content-between p-price"><span>Nom du producteur </span><span>{produit.name}</span></div>
            </div>
            <div class="d-flex justify-content-between total font-weight-bold mt-4"><span> <button style={{ borderRadius:'5px', width:'150px' }} > <Link onClick={()=>ajouterPanier(produit.produitId)} style={{ textDecoration:'none',color:'white' }}> panier</Link> </button> </span><span><button button style={{ borderRadius:'5px', width:'150px' }} > <Link to={`/Details/${produit.produitId}`} style={{ textDecoration:'none',color:'white' }}>Détails</Link> </button> </span></div>
        </div>
 ))}


        

  
 <ToastContainer />
 
    </> 


   
    
  )
}
