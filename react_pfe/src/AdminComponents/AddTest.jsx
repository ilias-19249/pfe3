import React, { useEffect, useState } from 'react';
import './AddTest.css'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddTest() {
    const [message, setMessage] = useState('');
    const [tests, setTests] = useState([]);
    const [testName, setTestName] = useState('');
    const [testDescription, setTestDescription] = useState('');
  
    const handleTestNameChange = (event) => {
      setTestName(event.target.value);
    };
  
    const handleTestDescriptionChange = (event) => {
      setTestDescription(event.target.value);
    };
  
    const getTests= async ()=>{
     const data=await axios.post('http://localhost:8000/admin/AfficherTests');
     setTests(data.data.tests);
    }


    useEffect(()=>{
    getTests();
    },[])

    const handleSubmit = async  (event) => {
      event.preventDefault();
      if (testName.trim() !== '' && testDescription.trim() !== '') {
        const data=await axios.post('http://localhost:8000/admin/AjouterTest?nom=nom&description=description',{
            nom:testName,
            description:testDescription
        })
        // console.log(data);
        // setMessage('Test ajouté avec succes');
        // setTimeout(() => {
        //     setMessage('');
        //   }, 3000);
        toast.success('Test ajouté avec succès!', {
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

      } else {
        alert('Veuillez remplir tous les champs.');
      }
    };
  
  return (
    <div>
      <div className="app4">
        {/* {message && <h1 style={{ color:'red' }}>{ message }</h1>} */}
        <ToastContainer />
        <form onSubmit={handleSubmit} style={{ marginTop:'3.5rem' }}>
        <h1 style={{ color:'black' }}>Ajouter un Test</h1>

          <div className="form-group">
            <label htmlFor="testName">Nom du Test :</label>
            <input
              type="text"
              id="testName"
              value={testName}
              onChange={handleTestNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="testDescription">Description du Test :</label>
            <textarea
              id="testDescription"
              value={testDescription}
              onChange={handleTestDescriptionChange}
            />
          </div>
          <button type="submit">Ajouter</button>
        </form>
        {/* <div className="table-test">
        <h2> La liste des tests</h2>
        <table className='table'>
          <thead style={{ backgroundColor:'#01382e',color:'white' }}>
            <tr >
            <th>ID du Test</th>
              <th>Nom du Test</th>
              <th>Description du Test</th>
              <th>Date du Test</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor:'black',color:'white' }}>
            {tests.map((test) => (
              <tr className='bg-base-200' key={test.id} style={{ backgroundColor:'black',color:'white' }}>
                <td>{test.id}</td>
                <td>{test.nom}</td>
                <td>{test.description}</td>
                <td>{test.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      </div>
    </div>
  )
}
