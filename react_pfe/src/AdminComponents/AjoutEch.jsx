import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AjoutEch.css';

export default function AjoutEch() {
  const [productName, setProductName] = useState('');
  const [receivedDate, setReceivedDate] = useState('');
  const [originOfProduct, setOriginOfProduct] = useState('');
  const [productionDate, setProductionDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [ingrédients, setIngrédients] = useState('');
  const [category, setCategory] = useState('');
  const [storageConditions, setStorageConditions] = useState('');
  const [samplePhotos, setSamplePhotos] = useState('');
  const [producers, setProducers] = useState([]);
  const [id, setId] = useState('');

  const getProducersInfos=async ()=>{
    const data=await axios.post('http://localhost:8000/admin/producersId');
    setProducers(data.data.ids);
  }
  useEffect(()=>{
   getProducersInfos();
   getProducersInfos();
  //  console.log(producers);
  },[])

  const handleSubmit =async (e) => {
    console.log(samplePhotos);
    e.preventDefault();
    const data=await axios.post('http://localhost:8000/admin/ajouterEchantillon',{
      nom:productName,
      date_reception:receivedDate,
      // date_production:productionDate,
      // date_expiration:expirationDate,
      category:category,
      origine:originOfProduct,
      producteur_id:id,
      image:samplePhotos,
      res_final:id,
      ingrédients:ingrédients,
      stockage:storageConditions
    });
    console.log(data.data);
    toast.success('L échantillon est ajouté avec succes !', {
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

  const handleId = (id)=>{
    setId(id);
    // console.log(id);
  }

  const handleInputChange = (e, setterFunction) => {
    setterFunction(e.target.value);
  };

  const handleFileInputChange = (e) => {
    const file=e.target.files[0];
    const reader=new FileReader();
    reader.onloadend=()=>{
      setSamplePhotos(reader.result.toString());
    }
    reader.readAsDataURL(file);
    // setSamplePhotos(e.target.files[0]);
  };

  return (
    <div className="echantillon-container" style={{ marginTop:'-28rem' }}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ color:'black',textAlign:'center' }}>Ajouter un échantillon</h2>
        <div className="echantillon-row">
          <div className="echantillon-group">
            <label> Nom du produit:</label>
            <input type="text" value={productName} onChange={(e) => handleInputChange(e, setProductName)} required />
          </div>
          <div className="echantillon-group">
            <label>Date de réception:</label>
            <input type="date" value={receivedDate} onChange={(e) => handleInputChange(e, setReceivedDate)} required />
          </div>
        </div>

        <div className="echantillon-row">
          <div className="echantillon-group">
            <label>L'origine d'échantillon :</label>
            <input type="text" value={originOfProduct} onChange={(e) => handleInputChange(e, setOriginOfProduct)} required />
          </div>
          <div className="echantillon-group">
          <label>Producteur :</label>
          <select style={{ width:'335px',height:'40px' }} name="" id="" onChange={(e) => handleId(e.target.value)}>
            <option value=""></option>
            {/* <option value="">oma</option> */}
            {producers.map((p)=>(
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
            
          </select>
        </div>
          {/* <div className="echantillon-group">
            <label>Production Date:</label>
            <input type="date" value={productionDate} onChange={(e) => handleInputChange(e, setProductionDate)} required />
          </div> */}
        </div>

        <div className="echantillon-group">
          <label>Ingrédients :</label>
          <textarea value={ingrédients} onChange={(e) => handleInputChange(e, setIngrédients)} required />
        </div>

        <div className="echantillon-group">
          <label>Catégorie:</label>
          <input type="text" value={category} onChange={(e) => handleInputChange(e, setCategory)} required />
        </div>
           <div className="echantillon-row">
          <div className="echantillon-group">
            <label>conditions de stockage :</label>
            <input type="text" value={storageConditions} onChange={(e) => handleInputChange(e, setStorageConditions)} required />
          </div>
        
          <div className="echantillon-group">
            <label htmlFor="file-upload" className="file-upload-label">
              <FontAwesomeIcon icon={faUpload} /> Select File
            </label>
            <input id="file-upload" type="file"  multiple onChange={handleFileInputChange}  required />
          </div>
       <button type="submit">
          <FontAwesomeIcon icon={faPaperPlane} /> Envoyer
        </button>
        </div> 
      </form>
      <ToastContainer />
    </div>
  );
}
