import { useForm } from 'react-hook-form';

export const Auth = () => {

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

  const handleAuth = () => {
    if (watch("username") === "administrador" && watch("password") === "zegoiaba") {
      console.log("auth successful")
    } else {
      console.log("auth failed")
    }
  }

  return (
    <div className="auth-container">
      <div>
        <label htmlFor="username">Usuário</label>
        <input type="text" {...register("username")}/>
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input type="password" {...register("password")}/>
      </div>
      <button onClick={() => handleAuth()}>Confirmar</button>
    </div>
  )
}