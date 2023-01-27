import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSessionStorage } from 'usehooks-ts';
import { UserCircle, LockKeyOpen, XCircle } from "phosphor-react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthGoogleContext } from '../../contexts/AuthGoogleProvider';
import { AuthEmailContext } from '../../contexts/AuthEmailProvider';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';



export const Auth = () => {
  // const { handleGoogleSignIn, signed, user } = useContext(AuthGoogleContext);
  
  // async function loginGoogle() {
  //   await handleGoogleSignIn();
  // }

  // Hook Form Controller
  const {
    watch,
    register,
    setValue,
    getValues
  } = useForm({
    mode: "all"
  });
  
  const { 
    setLoginEmail,
    setLoginPassword,
    loginUser,
    logoutUser,
    isSignedIn,
    errorMsg
  } = useContext(AuthEmailContext);

  const navigate = useNavigate();

  // Back to main page when logged in
  useEffect(() => {
    isSignedIn ? navigate("/") : null;
  }, [isSignedIn])

  // Inputs data going to auth context
  useEffect(() => {
    setLoginEmail(watch("email"));
    setLoginPassword(watch("password"));
  }, [watch()]);

  function handleLogin () {
    loginUser();
    setValue("email", "");
    setValue("emailReset", "");
    setValue("password", "");
  }

  // Password Reset
  const auth = getAuth();
  function handleSendPasswordReset() {
    sendPasswordResetEmail(auth, getValues("emailReset"))
      .then(() => {
        console.log("password reset sent");
        setValue("emailReset", "");
        setIsForgotPassword(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ "errorCode": errorCode, "errorMessage": errorMessage })
      });
  }

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // console.log({
  //   "email": watch("email"),
  //   "resetEmail": watch("emailReset")
  // })

  // Reset State
  function handleResetState() {
    setIsForgotPassword(current => !current);
    setValue("email", "");
    setValue("emailReset", "");
    setValue("password", "");
  }


  // Toasts
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
        {
          !isForgotPassword ?
          <Link to="/">
            <XCircle size={40} color="#154854" weight="fill" />
          </Link> :
          <div className="x-wrapper" onClick={() => handleResetState()}>
            <XCircle size={40} color="#154854" weight="fill" />
          </div>
        }
        
      </header>
      {
        !isForgotPassword ?
        <>
          <section>
            <span>Faça login para continuar</span>
            <div className="input-wrapper">
              <UserCircle size={36} color="#154854" weight="duotone" />
              <input 
                type="text" 
                placeholder="Email" 
                {...register("email")}
              />
            </div>
            <div className="input-wrapper">
              <LockKeyOpen size={36} color="#154854" weight="duotone" />
              <input 
                type="password" 
                placeholder="Senha" 
                {...register("password")}
              />
            </div>
            <div className="forgot-password-wrapper">
              <span 
                id="forgot-password" 
                onClick={() => handleResetState()}>
                  Esqueci a senha
                </span>
            </div>
            
              <button onClick={() => handleLogin()}>Confirmar</button> :
            
            <ToastContainer closeButton={false} />
          </section>
        </> :
        <>
        <section>
          <span id="reset-title">Insira seu e-mail e clique em enviar</span>
          <div className="input-wrapper">
            <UserCircle size={36} color="#154854" weight="duotone" />
            <input 
              type="text" 
              placeholder="Email" 
              {...register("emailReset")}
            />
          </div>
          
          {/* <div className="forgot-password-wrapper">
            <span 
              id="forgot-password" 
              onClick={() => handleResetState()}>
                Voltar
              </span>
          </div> */}
          
            <button onClick={() => handleSendPasswordReset()}>Enviar</button> :
          
          <ToastContainer closeButton={false} />
        </section>
      </>
      }
      
    </div>
  )
}