import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useSessionStorage } from 'usehooks-ts';
import { UserCircle, LockKeyOpen, XCircle } from "phosphor-react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthGoogleContext } from '../../contexts/AuthGoogleProvider';
import { AuthEmailContext } from '../../contexts/AuthEmailProvider';



export const Auth = () => {
  // const { handleGoogleSignIn, signed, user } = useContext(AuthGoogleContext);
  
  // async function loginGoogle() {
  //   await handleGoogleSignIn();
  // }

  // Controlador Hook Form
  const {
    watch,
    register,
    setValue,
    getValues
  } = useForm({
    mode: "all"
  });
  
  const { setRegisterEmail, setRegisterPassword, registerUser } = useContext(AuthEmailContext);

  useEffect(() => {
    setRegisterEmail(watch("email"));
    setRegisterPassword(watch("password"));
  }, [watch()]);
  

  

  const NotifyError = () => {
    toast.error('Senha incorreta!', {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const NotifySuccess = () => {
    toast.success('Bem vindo!', {
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

  return (

    <div className="auth-container">
      <header>
        <h2>Área do Porteiro</h2>
        <Link to="/">
          <XCircle size={40} color="#154854" weight="fill" />
        </Link>
      </header>
      <section>
        <span>Faça login para continuar</span>
        <div className="input-wrapper">
          <UserCircle size={36} color="#154854" weight="duotone" />
          <input type="text" placeholder="Email" {...register("email")}/>
        </div>
        <div className="input-wrapper">
          <LockKeyOpen size={36} color="#154854" weight="duotone" />
          <input type="password" placeholder="Senha" {...register("password")}/>
        </div>
        
          <button onClick={() => registerUser()}>Confirmar</button> :
        
        <ToastContainer closeButton={false} />
      </section>
    </div>
  )
}