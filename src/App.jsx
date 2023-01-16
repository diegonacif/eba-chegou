import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSessionStorage } from 'usehooks-ts';

import jsonData from './assets/data.json';
import apartment from './assets/apartment.svg';
import { Link } from 'react-router-dom';
import { UserCircle, SignOut, WindowsLogo } from "phosphor-react";
import './styles/App.css';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './services/firebase-config.js';
// import { AuthGoogleContext } from './contexts/AuthGoogleProvider';
import { AuthEmailContext } from './contexts/AuthEmailProvider';

function App() {

  const { 
    registerEmail, 
    setRegisterEmail, 
    registerPassword, 
    setRegisterPassword,
    registerUser,
    loginUser,
    logoutUser,
    signed
  } = useContext(AuthEmailContext);
  // let userLoggedIn = JSON.parse(user);
  

  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsSignedIn(signed);
    }, 300)
  }, [signed])

  console.log({signed: signed, isSignedIn: isSignedIn});

   // Controlador Hook Form
  const {
    watch,
    register,
    setValue,
    getValues
  } = useForm({
    mode: "all",
  });

  // Current Block State
  const [block, setBlock] = useState(1);
  useEffect(() => {
    if(getValues("block") === undefined || getValues("block") === "") {
      return;
    } else {
      return setBlock(getValues("block"));
    }
  }, [watch("block")]);

  const blocksCollectionRef = collection(db, "blocks");
  const apartmentsCollectionRef = collection(db, `blocks/${block}/apartments`);
  const [blocks, setBlocks] = useState([]);
  const [apartments, setApartments] = useState([]);

  // const [residentDeliverStatus, setResidentDeliverStatus] = useState(false);

  // Blocks Data
  useEffect(() => {
    const getBlocks = async () => {
      const data = await getDocs(blocksCollectionRef);
      setBlocks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getBlocks();
  }, [])

  // Apartments Data
  useEffect(() => {
    const getApartments = async () => {
      const data = await getDocs(apartmentsCollectionRef);
      setApartments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getApartments();
  }, [block])

  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useSessionStorage('isAuthenticated', false);

  const handleSignOut = () => {
    setIsAuthenticated(false);
    NotifySuccess();
  }

  const NotifySuccess = () => {
    toast.success('Deslogado!', {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  // Handle Result
  const handleResult = () => {
    const resultApt = (watch("apt"));
    const resultStatus = apartments.filter(x => x.id === resultApt)[0].status
    // const resident = residents.find((resident) => resident.apartment === resultApt & resident.block === resultBlock);
    
    return (
      console.log(resultStatus),
      window.location.assign(`/result/${resultStatus}`)
    )
  }

  return (
    <div className="main-container">
      <header>
        <h2>Eba, chegou!</h2>
        {
          isAuthenticated ?
          <button onClick={() => {handleSignOut()}}>
            <SignOut size={40} color="#154854" weight="fill" />
          </button> :
          <Link to="/auth">
            <UserCircle size={40} color="#154854" weight="fill" />
          </Link>
        }
        
      </header>

      <section>
        <span>Escolha o seu bloco</span>
        <div className="input-wrapper">
          <img src={apartment} alt="" />
          <select 
            id="block" 
            defaultValue={""}
            {...register("block")}
          >
            <option value="" disabled>Selecione</option>
            {blocks?.map((data) => (
              <option key={data.id} value={data.id}>{data.id}</option>
            ))}
          </select>
        </div>
        
        {
          watch("block") !== "" & watch("block") !== undefined ?
          <>
            <span>Agora o seu apartamento</span>
            <select 
              id="apt" 
              defaultValue={""}
              {...register("apt")}
            >
              <option value="" id="selector" disabled>Selecione</option>
              {apartments.map((option) => (
                <option key={option.id} value={option.id}>{option.id}</option>
              ))}
            </select>
          </> :
          null
        }
        { 
          watch("apt") !== "" & watch("apt") !== undefined ?
          <button onClick={handleResult}>Confirmar</button> :
          null
        }
        

        {/* <select id="answer" {...register("answer")}>
          <option value="yes">Chegou sua encomenda!</option>
          <option value="no">Espere mais um cadin</option>
        </select> */}
        <button onClick={() => logoutUser()}>Signout</button>
      </section>
      <ToastContainer closeButton={false} />
    </div>
  )
}

export default App
