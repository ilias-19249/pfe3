import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './TestUni.css'
import { useParams } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TestUni() {
    const {id}=useParams();
    const [message,setMessage]=useState('');
    const [stateSelected,setStateSelected]=useState(0);
    const [selectedTest,setSelectedTest]=useState(0);
    const [tests,setTests]=useState([]);
    const [echNom,setEchNom]=useState('');

    const handleStateSelected=(e)=>{
        setStateSelected(e.target.value);
    }
    const handleTestChange=(e)=>{
       setSelectedTest(e.target.value);
    }
    const getTests= async () =>{
    const data=await axios.post('http://localhost:8000/admin/AfficherTests');
    // console.log(data.data);
    setTests(data.data.tests);
    } 
    const echName=async ()=>{
       const data=await axios.post(`http://localhost:8000/admin/Echantillon/${id}`);
       setEchNom(data.data.data.nom);
    }
    const envoyer_res=async (e)=>{
        e.preventDefault();
        const res=await axios.post('http://localhost:8000/admin/donnerRtest',{
        'test_id':selectedTest,
        'echantillon_id':id,
        'res':stateSelected
        });
        console.log(res.data.status);
        if(res.data.status === 400){
          // setMessage('Ce test est déja ajouté.');
          // setTimeout(() => {
          //     setMessage('');
          //   }, 3000);
          toast.success('résultat du test est sauvegardé avec succès !', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }else{
          setMessage('Résultat du test a bien été ajoutée');
        setTimeout(() => {
            setMessage('');
          }, 3000);
        }
        
    }
    useEffect(()=>{
   getTests();
   echName();
    },[])
  return (
    <div className="sample-form-wrapper">
      <h2 style={{ color:'black' }}>Formulaire d'examen d'échantillon</h2>
      {/* {message && <h1 style={{ color:'red' }}>{ message }</h1>} */}
      <form action="#" method="post" onSubmit={envoyer_res}>
        <div className="form-group">
            <label htmlFor=""> Nom d'échantillon :  </label>
            <p style={{ color:'black',position:'absolute',top:'10.3rem',left:'14rem' }}>{echNom}</p>
        </div>
        <div className="form-group">
          <label htmlFor="test">Choisir un test :</label>
          <select id="test" name="test" onChange={handleTestChange}>
            <option value=""></option>
            {tests.map( t => (
                 <option key={t.id} value={t.id}> {t.nom} </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="etat">État de l'échantillon :</label>
          <select id="etat" name="etat" onChange={handleStateSelected}>
            <option value=""></option>
            <option value="1">Conforme</option>
            <option value="0">Non conforme</option>
          </select>
        </div>
        <button type="submit">Soumettre</button>
      </form>
      <ToastContainer />
    </div>
  )
}
