import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSessionStorage } from 'usehooks-ts';

import jsonData from './assets/data.json';
import apartment from './assets/apartment.svg';
import { Link } from 'react-router-dom';
// import { UserCircle, SignOut, WindowsLogo } from "phosphor-react";
import './styles/App.css';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './services/firebase-config.js';
// import { AuthGoogleContext } from './contexts/AuthGoogleProvider';
import { AuthEmailContext } from './contexts/AuthEmailProvider';
import { Header } from './components/Header/Header';

function App() {

  const { 
    registerEmail, 
    setRegisterEmail, 
    registerPassword, 
    setRegisterPassword,
    registerUser,
    loginUser,
    logoutUser,
    isSignedIn
  } = useContext(AuthEmailContext);
  
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
  const status = [
    { text: "Não Chegou", id: 0 },
    { text: "Chegou", id: 1 },
  ]
  const currentStatus = apartments.filter(x => x.id === watch("apt"))[0]?.status
  
  const newStatus = watch("status") === "Chegou" ? true : 
                    watch("status") === "Não Chegou" ? false :
                    null
  

  // console.log({"status atual": currentStatus, "status selecionado": watch("status")});
  // console.log(apartments.filter(x => x.id === watch("apt"))[0]?.id)
  console.log({newstatus: newStatus, currentStatus: currentStatus, aptForm: watch("apt")});



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
    setValue("apt", "");
  }, [block])

  // useEffect(() => {
  //   setValue("status", "")
  // }, [watch("apt")])

  // console.log(apartments.filter(x => x.id === watch("apt"))[0]?.status);
  // console.log(status)

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
    
    return (
      // console.log(resultStatus),
      window.location.assign(`/result/${resultStatus}`)
    )
  }

  const updateStatus = async (id, status) => {
    const statusDoc = doc(db, `blocks/${block}/apartments`, id)
    const newStatus = {status: status}
    await updateDoc(statusDoc, newStatus)
    NotifySuccess();
    window.location.reload(true)
  }


  return (
    <div className="main-container">
      
      <Header />

      <section>
        {isSignedIn ? <span>Escolha o bloco</span> : <span>Escolha o seu bloco</span>}
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
            {isSignedIn ? <span>Agora o apartamento</span> : <span>Agora o seu apartamento</span>}
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
          isSignedIn &  watch("apt") !== "" & watch("apt") !== undefined ?
          <>
            <span>Selecione o status de encomenda</span>

            <select 
              id="status"
              {...register("status")}
            >
              {status.map((option) => (
                <option key={option.id} value={option.text} selected={currentStatus ? true : false}>{option.text}</option>
              ))}
            </select>



            {/* <select id="answer" {...register("answer")}>
              <option value="yes">Chegou</option>
              <option value="no">Não chegou</option>
            </select> */}
          </> :
          null
        }
        { isSignedIn ?

          watch("apt") !== "" & watch("apt") !== undefined ?
          <button onClick={() => updateStatus(watch("apt"), newStatus)}>Confirmar</button> :
          null : 

          watch("apt") !== "" & watch("apt") !== undefined ?
          <button onClick={handleResult}>Confirmar</button> :
          null
        }
        
        

        {/* <button onClick={() => logoutUser()}>Signout</button> */}
      </section>
      <ToastContainer closeButton={false} />
    </div>
  )
}

export default App
