import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function ProduitsCrud() {
  const [showRectangle, setShowRectangle] = useState(false);
    const [dateProduction, setDateProduction] = useState('');
    const [dateExpiration, setDateExpiration] = useState('');
const [produits,setProduits]=useState([]);
const [nom,setNom]=useState('');
const [price,setPrice]=useState('');
const id=localStorage.getItem('producer_id');
const [quantité,setQuantité]=useState(0);
const getProducts = async ()=>{
const data=await axios.post(`http://localhost:8000/producer/getProducts/${id}`);
setProduits(data.data.echs);
}
const handleButtonClick = () => {
  setShowRectangle(true);
};
const handleSaveButtonClick =async (p) => {
    console.log(dateExpiration,dateProduction);
   const data=await axios.post(`http://localhost:8000/producer/périodeProduit/${p}`,{
    date_production:dateProduction,
    date_expiration:dateExpiration
   });
   toast.success('les dates sont définies !', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    getProducts();

  setShowRectangle(false);
};

useEffect(()=>{
 getProducts()
},[])
const handleQuantityChange=(e)=>{
setQuantité(e.target.value)
}
const DéfinirDates=(p)=>{

}
const handleProductChange = (e) => {
    setNom(e.target.value); 
   }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        // console.log(nom);
     const data=await axios.post(`http://localhost:8000/producer/definirQuantite/${nom}`,{
        'quantité':quantité,
        'prix':price
     })
     toast.success('quantité définie avec succès!', {
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
        getProducts();
    }
    const handlePriceChange=(e)=>{
    setPrice(e.target.value)
    }
    const supprimerProduit= async(p)=>{
     const data=await axios.post(`http://localhost:8000/producer/supprimerProduit/${p}`);
     toast.info('Produit est supprimé avec succès  !', {
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
  return (
    <div>
    <div class="max-w-md mx-auto" style={{ position:'absolute',left:'37rem', top:'0.5rem',width:'450px' }}> 
  <form onSubmit={handleSubmit}>
    <h1 style={{ fontFamily:'roboto' }}>Gérer Votre Stock </h1>
    <div class="mb-4" style={{  }}>
      <label for="name" >Nom</label>
      <select style={{ marginLeft:'3rem', width:'15.5rem' }} id="name" onChange={handleProductChange}  name="Pname"  class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500">
        <option value=""> </option>
        {produits.map(p=>(
        <option value={p.id}> {p.nom} </option>
            
        ))}
        
      </select>
    </div>
    <div class="mb-4">
      <label for="quantity" class="block text-gray-700 font-bold mb-2">Quantité</label>
      <input style={{ marginLeft:'1rem' }} type="number" id="quantity" onChange={handleQuantityChange} name="quantity" class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500" placeholder="Entrer la quantité" />
    </div>
    <div class="mb-4">
      <label for="price" class="block text-gray-700 font-bold mb-2">Prix</label>
      <input style={{ marginLeft:'3rem' }} type="number" id="quantity" onChange={handlePriceChange} name="quantity" class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500" placeholder="Entrer le prix" />
    </div>
    <div class="flex justify-end">
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Envoyer</button>
    </div>
  </form>
</div>
<div className="overflow-x-auto" style={{ marginLeft:'45px' }}>
  
  <table className="table" style={{ width:'1110px' , marginLeft:'20rem',marginTop:'31rem' }}>
    <thead>
      <tr>
        <th style={{ textAlign:'center' }}></th>
        <th style={{ textAlign:'center' }}>Nom</th>
        <th style={{ textAlign:'center' }}>Quantité</th>
        <th style={{ textAlign:'center' }}>Date de production</th>
        <th style={{ textAlign:'center' }}>Date d'expiration </th>
        <th style={{ textAlign:'center' }}>Prix</th>
        <th style={{ textAlign:'center' }}>Supprimer</th>
        <th style={{ textAlign:'center' }}>Définir les dates </th>
      </tr>
    </thead>
    <tbody>
   {produits.map(p=>(
    <tr className="bg-base-200">
        <th style={{ textAlign:'center' }}>{p.id}</th>
        <td style={{ textAlign:'center' }}>{p.nom}</td>
        <td style={{ textAlign:'center' }}>{p.quantité}</td>
        <td style={{ textAlign:'center' }}>{p.date_production}</td>
        <td style={{ textAlign:'center' }}>{p.date_expiration}</td>
        <td style={{ textAlign:'center' }}>{p.prix}</td>
        {/* <p style={{ textAlign:'center' , backgroundColor:'red', padding:'5px' }}>nk</p> */}
        <td><button className='btn btn-danger'  onClick={()=> supprimerProduit(p.id)} >Supprimer</button></td> 
        <td><button className='btn btn-primary' onClick={()=> handleButtonClick()} > Définir </button></td>
        <div>
            {showRectangle && (
                <div style={{ border: '1px solid black',borderRadius:'15px',width:'500px',height:'250px',position:'absolute',top:'250px',backgroundColor:'#2a2185',padding:'10px',left:'37rem' }}>
  <FontAwesomeIcon style={{ position:'absolute',right:'10px',top:'7px' }} icon={faTimes} className="close-icon text-light" onClick={() => setShowRectangle(false)} />
                    
                    <label className='text-light'>Date de production:</label>
                    <input type="datetime-local" className='p-1 border border-3 rounded' style={{ marginLeft:'2.5rem' }} value={dateProduction} onChange={(e) => setDateProduction(e.target.value)} />
                    <br />
                    <label className='text-light mr-5'>Date d'expiration:</label>
                    <input type="datetime-local" className='p-1 border border-3 rounded' style={{ marginLeft:'3.4rem' }} value={dateExpiration} onChange={(e) => setDateExpiration(e.target.value)} />
                    <br />
                    <button  style={{ backgroundColor:'white' ,marginLeft:'21rem',marginTop:'3rem', color:'black',borderRadius:'12px' }} onClick={()=>handleSaveButtonClick(p.id)}>Sauvegarder</button>
                </div>
            )}
        </div>
    </tr>
   ))} 
    
   
     
      
    
    </tbody>
  </table>
</div>

<ToastContainer />



    </div>
  )
}
