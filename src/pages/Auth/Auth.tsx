import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useSessionStorage } from 'usehooks-ts';
import { UserCircle, LockKeyOpen, XCircle } from "phosphor-react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const Auth = () => {

  const [isAuthenticated, setIsAuthenticated] = useSessionStorage('isAuthenticated', false);

  // Controlador Hook Form
  const {
    watch,
    register,
    setValue,
    getValues
  } = useForm({
    mode: "all"
  });

  const user = "administrador";
  const pwrd = "zegoiaba";

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

  const handleAuth = () => {
    if (watch("username") === "administrador" && watch("password") === "zegoiaba") {
      console.log("auth successful")
      NotifySuccess();
      setIsAuthenticated(true);
      setTimeout(() => {
        window.location.replace("/")
      }, 2000)

    } else {
      console.log("auth failed")
      NotifyError();
    }
  }


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
          {/* <label htmlFor="username">Usuário</label> */}
          <UserCircle size={36} color="#154854" weight="duotone" />
          <input type="text" placeholder="Usuário" {...register("username")}/>
        </div>
        <div className="input-wrapper">
          {/* <label htmlFor="password">Senha</label> */}
          <LockKeyOpen size={36} color="#154854" weight="duotone" />
          <input type="password" placeholder="Senha" {...register("password")}/>
        </div>
        <button onClick={() => handleAuth()}>Confirmar</button>
        <ToastContainer closeButton={false} />
      </section>
    </div>
  )
}