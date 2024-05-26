import React, {  useEffect, useRef, useState } from 'react'
import './Facturation.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import {useReactToPrint} from "react-to-print"
import { useParams,useNavigate } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';

export default function Facture() {
  const [loader,setLoader]=useState(false)
  const pdfRef = useRef();
  const [nomP,setNomP]=useState('');
  const [emailP,setEmailP]=useState('');
    const { id }=useParams();
    const [user,setUser]=useState();
    const [userEmail,setUserEmail]=useState();
    const [userTele,setUserTele]=useState();
    const [userAdd,setUserAdd]=useState();
    const [fct,setFct]=useState({});
    const [showD,setD]=useState(true);

    const userInfos=async ()=>{
        const id=localStorage.getItem('user_id');
        const data=await axios.post(`http://localhost:8000/infosUser/${id}`);
        setUser(data.data.infos.name);
        setUserAdd(data.data.infos.addresse);
        setUserTele(data.data.infos.telephone);
        setUserEmail(data.data.infos.email)
    }
    const infosFacturation = async ()=>{
        const data=await axios.post(`http://localhost:8000/facturation/${id}`);
        setFct(data.data.result[0]);
        setNomP(data.data.result[0].name);
        setEmailP(data.data.result[0].email);
        console.log(data.data.result[0]);
    }
    const downloadPdf=()=>{
      const input = pdfRef.current;
      html2canvas(input).then((canvas)=>{
        const imgData=canvas.toDataURL('image/png');
        const pdf=new jsPDF('p','mm','a4',true);
        const pdfWidth=pdf.internal.pageSize.getWidth();
        const pdfHeight=pdf.internal.pageSize.getHeight();
        const imgWidth=canvas.width;
        const imgHeight=canvas.height;
        const ratio=Math.min(pdfWidth/imgWidth , pdfHeight/imgHeight);
        const imgX=(pdfWidth-imgWidth * ratio) / 2;
        const imgY=30;
        pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
        pdf.save('invoice.pdf')
      })
    }
    const handlePrint = useReactToPrint({
      content: () => pdfRef.current,
    });
    const print=()=>{
       setD(false);
      //  handlePrint()
      setTimeout(() => {
      handlePrint()
       }, 2000);
       setTimeout(() => {
        handlePrint()
         }, 12000);
    }


   
    useEffect(()=>{
    userInfos();
    infosFacturation();
    },[])

    

  return (
    <>
    <div className="invoice-container" ref={pdfRef}>
    <h1>Facture</h1>
 <div className="header1">
   <div className="seller">
     <h2>Vendeur :</h2>
     <p>Nom du vendeur :  {nomP} </p>
     <p>email du vendeur : {emailP} </p>
   </div>
   <div className="client">
     <h2>Client : </h2>
     <p>Nom  : {user}</p>
     <p>Adresse : {userAdd}</p>
     <p>Téléphone : {userTele}</p>
     <p>Email : {userEmail}</p>
   </div>

 <div className="details">
   <h2>Date de facturation: </h2>
   <p>{new Date().toLocaleDateString()}</p>
 </div>  </div>
 <table className="invoice-table">
   <thead >
     <tr>
      <th>Id</th>
       <th>nom du produit</th>
       <th>Quantité</th>
       {/* <th>Unité</th> */}
       <th>Total TTC</th>
     </tr>
   </thead>
   <tbody>
     <tr>
      <td>{fct.commande_id}</td>
       <td>{fct.nom}</td>
       <td>{fct.commandeQte}</td>
       {/* <td>Unité</td> */}
       <td>{fct.commandePrix} Dhs</td>
     </tr>
   </tbody>
 </table>
  {showD && <button class="button download"   onClick={print}>Télécharger </button>} 
</div>
    </>
    
  )
} 
