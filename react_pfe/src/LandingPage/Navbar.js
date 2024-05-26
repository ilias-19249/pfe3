import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faEnvelope, faLock, faSignInAlt, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavBar() {
  const navigate = useNavigate();
  const [telephone,setTelephone]=useState('')
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showRectangle, setShowRectangle] = useState(false);
  const [showServicesCard, setShowServicesCard] = useState(false);
  const [email,setEmail]=useState('')
  const [address,setAddress]=useState('')
  const [naissance,setNaissance]=useState('')
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [role,setRole]=useState('admin')

  const handleEmail=(p)=>{
setEmail(p)
  }
  const handleTelephone=(p)=>{
    setTelephone(p)
  }
  const handleAddress=(a)=>{
setAddress(a)
  }
  const handleNaissance=(n)=>{
    setNaissance(n)
  }

  const checkLogin=()=>{
    const token = localStorage.getItem('user_authentication');
    const admintoken = localStorage.getItem('admin_authentication');
    const producertoken = localStorage.getItem('producer_authentication');
    if(token){
     navigate('produits')
    }else if(admintoken){
     navigate('admin')
      
    }else if(producertoken){
      navigate('producer')
    
    }

  }
  const handlePassword=(p)=>{
setPassword(p)
  }
  const handleRole=(p)=>{
   setRole(p)
  }
  const handleLogin =async (e)=>{
   e.preventDefault()
   if(role === 'client'){
    try{
      const data=await axios.post(`http://localhost:8000/login`,{
        email:email,
       password : password
       }
      )
      if(data.data.status === 200){
        localStorage.setItem('user_id',data.data.user[0].id)
       localStorage.setItem('user_authentication','authenticated')
       navigate('/produits');
      }else if(data.data.message){
        toast.error(data.data.message, {
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
    }catch(e){
     e.response.data.errors.forEach(error => {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  });
    
    }

    
   
   } else {
    const data=await axios.post(`http://localhost:8000/${role}/login`,{
      email:email,
      password : password
     })
     console.log(data.data.errors);
     if(data.data.errors){
      data.data.errors.forEach(error => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
    });
      
     }else if(data.data.message === 'authenticated'){
    localStorage.setItem(`${role}_authentication`,'authenticated')
     localStorage.setItem(`${role}_id`,data.data.data[0].id)
     navigate(`/${role}`);
     console.log(data.data);
     }else if(data.data.message === 'not authenticated'){
      toast.error('les informations sont incorrectes', {
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

     }
     
   }
  }
  useEffect(()=>{
    checkLogin()
  },[])
  const handleRegister = async(e)=>{
    console.log(naissance,address);
   try{
    e.preventDefault()
    console.log(name,email,password,address,naissance);
      const data=await axios.post('http://localhost:8000/register',{
       name:name,
       email:email,
       password:password,
       naissance:naissance,
       addresse:address,
       telephone:telephone
   
      })
      console.log(data.data);
       if(data.data.status == 201){
       localStorage.setItem('user_id',data.data.user.id)
      localStorage.setItem('user_authentication','authenticated')
      navigate('/produits');
       }else if(data.data.errors){
         data.data.errors.forEach(error => {
           toast.error(error.message, {
             position: "top-center",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "light",
             });
       });
       }
   }catch(e){
    toast.error("Le champs email doit être unique", {
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
      
  }

  const handleLoginClick = () => {
    setShowLoginForm(!showLoginForm);
    setShowSignUp(false);
    setShowRectangle(false);
  };
 

  const handleSignUpClick = () => {
    setShowSignUp(!showSignUp);
    setShowLoginForm(false);
    setShowRectangle(false);
  };

  const handleBackToLoginClick = () => {
    setShowLoginForm(true);
    setShowSignUp(false);
    setShowRectangle(false);
  };
  const scrollParcours = () => {
    const aboutSection = document.getElementById('Parcours-section'); 
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToAboutSection = () => {
    const aboutSection = document.getElementById('about-section'); 
    aboutSection.scrollIntoView({ behavior: 'smooth' }); 
  };
  const scrollService = () => {
    const aboutSection = document.getElementById('Service-section'); 
    aboutSection.scrollIntoView({ behavior: 'smooth' }); 
  };
  const scrollStatistique = () => {
    const aboutSection = document.getElementById('Statistique-section'); 
    aboutSection.scrollIntoView({ behavior: 'smooth' }); 
  };

  const scrollContact = () => {
    const aboutSection = document.getElementById('Contact-section'); 
    aboutSection.scrollIntoView({ behavior: 'smooth' }); 
  };
  const scrollFaq = () => {
    const aboutSection = document.getElementById('Faq-section'); 
    aboutSection.scrollIntoView({ behavior: 'smooth' }); 
  };


  return (
    <div>
      <nav className="navbar" style={{ backgroundColor:'#01382e' }}>
        <div className="logo-container">
        </div>
        <div className="links-container">
          <a href="#s">Home</a>
          <a href="s#" onClick={scrollParcours}>Parcours Generale</a>
          <a href="#s" onClick={scrollToAboutSection}>Apropos</a>
          <a href="#s"  onClick={scrollService}>Services</a>
          <a href="#ss"  onClick={scrollStatistique}>Statistique</a>
          <a href="#s" onClick={scrollContact}>Contact</a>
          <a href="s#" onClick={scrollFaq }>FAQ</a>
       
          
        </div>
        <div className="login-container1">
          <button onClick={handleLoginClick} className="login-button1">
            < FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      
      </nav>

      {showLoginForm && (
        <>
          <div className="overlay1" onClick={handleLoginClick}></div>
          <div className="login-popup1">
            <h2 className="login-heading1">Sign in to Your Account</h2>
            <form className="login-form1" onSubmit={handleLogin} >
              <div className="input-group1">
                <FontAwesomeIcon icon={faEnvelope} className="icon1" />
                <input type="email" placeholder="Email" onChange={(e)=>handleEmail(e.target.value)}  />
              </div>
              <div className="input-group1">
                <FontAwesomeIcon icon={faLock} className="icon1" />
                <input type="password" placeholder="Password" onChange={(e)=>handlePassword(e.target.value)} />
              </div>
              <div className="input-group1">
                <FontAwesomeIcon icon={faLock} className="icon1" />
                <select className="select-style" onChange={(e)=>handleRole(e.target.value)} >
                 <option value="admin">admin</option>
                 <option value="producer">producteur</option>
                 <option value='client'>client</option>
                </select>
              </div>
              <button type="submit"className="login-button"><FontAwesomeIcon icon={faSignInAlt}/> Login</button>
            </form>
            <div className="options1">
              <button onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </>
      )}
        <ToastContainer />

      {showSignUp && (
        <>
          <div className="overlay1" onClick={handleSignUpClick}></div>
          <div className="signup-popup1">
            <h2 className="signup-heading1">Create an Account</h2>
            <form className="signup-form1" onSubmit={(e)=>handleRegister(e)}>
              <div className="input-group1">
                <FontAwesomeIcon icon={faUser} className="icon1" />
                <input type="text" placeholder="Username" onChange={(e)=>setName(e.target.value)} />
              </div>
              <div className="input-group1">
                <FontAwesomeIcon icon={faEnvelope} className="icon1"/>
                <input type="email" placeholder="Email" onChange={(e)=>handleEmail(e.target.value)}  />
              </div>
              <div className="input-group1">
                <FontAwesomeIcon icon={faLock}  className="icon1"/>
                <input type="password" placeholder="Password" onChange={(e)=>handlePassword(e.target.value)} />
              </div>
              
              <div className="input-group1">
        {/* <FontAwesomeIcon icon={faMapMarkerAlt} className="icon1" /> */}
        <input type="text" onChange={(e)=>handleAddress(e.target.value)} placeholder="Adresse"  />
      </div>
     
      <div className="input-group1">
        {/* <FontAwesomeIcon icon={faCalendar} className="icon1" /> */}
        <input type="date"  onChange={(e)=>handleNaissance(e.target.value)} placeholder="Date de naissance"  />
      </div>
      <div className="input-group1">
        <input type="text"  onChange={(e)=>handleTelephone(e.target.value)} placeholder="Téléphone" />
      </div>
    
              
              <button className="btn24" type="submit"><FontAwesomeIcon icon={faSignInAlt} /> Sign Up</button>
              <div className="options1">
                <button  onClick={handleBackToLoginClick}>Back</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
