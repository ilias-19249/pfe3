import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Commandes() {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [message, setMessage] = useState('');
  const [commandes,setCommandes]=useState([]);
  const id=localStorage.getItem('producer_id');
  const getCommandes= async ()=>{
    const data=await axios.post(`http://localhost:8000/producer/getCommandes/${id}`);
    setCommandes(data.data.commandes)
  }
  const bonneCommande=async (p)=>{
    const data=await axios.post(`http://localhost:8000/producer/bonneCommande/${p}`)
    toast.success('la commande est signalé comme une bonne commande', {
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
      getCommandes();
  }
  const confirmerReception=async (p)=>{
  const data=await axios.post(`http://localhost:8000/producer/confirmerReception/${p}`);
  toast.success('le client sera informé par la réception de sa commande', {
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
    getCommandes();
  }
  const messageClient =async (p)=>{
  const data=await axios.get(`http://localhost:8000/producer/messageClient/${p}/${message}`,);
  confirmerReception(p)
  // console.log(message);
  setShowMessageBox(false)
  }
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(()=>{
getCommandes()
  },[])

  return (
    <div>
       <div>
      <h1 style={{ position:'absolute',top:'10px', textAlign:'center' ,left:'45rem',marginBottom:'20px' }}> Commandes </h1>
      <div className="overflow-x-auto" style={{ marginLeft:'45px' }}>
  <table className="table" style={{ width:'1110px' , marginLeft:'20rem',marginTop:'5rem' }}>
    <thead>
      <tr>
        <th></th>
        <th>Nom client</th>
        <th>Nom du produit</th>
        <th>Quantité</th>
        <th>Prix_total</th>
        <th>date de commande</th>
        {/* <th>commande reçue</th> */}
        <th> statut réception </th>
        <th> Bonne commande </th>
      </tr>
    </thead>
    <tbody>
      {commandes.map(p=>(
         <tr className="bg-base-200">
        <td>{p.reference}</td>
        <td>{p.nom_client}</td>
        <td>{p.nom_produit}</td>
        <td>{p.quantite}</td>
        <td>{p.prix_total}</td>
        <td>{p.date_commande}</td>
        {/* <td>{p.com_recu===0? 'pas encore' : ' reçu'}</td> */}
        <td>{p.confirmation_admin === null || p.confirmation_admin === 0  ? <button  className='btn btn-primary' onClick={()=>setShowMessageBox(true)} style={{ whiteSpace:'nowrap' }}> Confirmer réception </button>:'confirmé'}   </td>
         <td>
         { p.bonne_commande === 1 ? 'bonne commande' : <button className='btn btn-success' onClick={()=>bonneCommande(p.reference)} style={{ whiteSpace:'nowrap' }}> Confirmer réception </button>    }
          </td>
          <div>
      {/* <button onClick={toggleMessageBox} >Show Message Box</button> */}
      {showMessageBox && (
        <div className="message-box" style={{ width:'30rem',height:'40rem',position:'absolute',top:'12rem',marginLeft:'-45rem' }}>
          <textarea
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={handleMessageChange}
          />
          <button /*onClick={handleSubmit}*/ onClick={()=>messageClient(p.reference)}>Submit</button>
        </div>
      )}
    </div>
      </tr>
      ))}
       
      
    
    </tbody>
  </table>
</div>
    </div>
 <ToastContainer />
 

    </div>
  )
}
