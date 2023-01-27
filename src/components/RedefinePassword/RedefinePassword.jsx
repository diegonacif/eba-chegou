import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeSlash, LockKeyOpen } from "phosphor-react"
import { getAuth, updatePassword } from "firebase/auth";
import { AuthEmailContext } from "../../contexts/AuthEmailProvider";

import '../../styles/App.css';

export const RedefinePassword = () => {
  const {
    watch,
    register,
    setValue,
    getValues
  } = useForm({
    mode: "all"
  });

  // User Logout
  const { logoutUser } = useContext(AuthEmailContext);


  // Update Password
  const auth = getAuth();
  const user = auth.currentUser;
  const [newPassword, setNewPassword] = useState("");
  console.log(newPassword.length)

  useEffect(() => {
    watch("newPassword") === watch("repeatNewPassword") ?
    setNewPassword(watch("repeatNewPassword")) :
    setNewPassword("")
  }, [watch("newPassword"), watch("repeatNewPassword")]);

  function handleRedefinePassword() {
    newPassword.length < 6 ?
    console.log("erro: senha menor que 6 caracteres") :
    updatePassword(user, newPassword).then(() => {
      console.log("update successful");
      logoutUser();
    }).catch((error) => {
      console.log(error)
    });
  }

  // Show Password
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(current => !current);
  }

  return (
    <div className="redefine-password-container">
      <section>
        <div className="input-wrapper">
          <LockKeyOpen size={36} color="#154854" weight="duotone" />
          <input 
            type={ showPassword ? "text" : "password" }
            placeholder="nova senha"
            {...register("newPassword")}
          />
          <div className="eye-wrapper">
            {
              showPassword ?
              <Eye onClick={() => handleShowPassword()} size={32} color="#154854" weight="duotone" /> :
              <EyeSlash onClick={() => handleShowPassword()} size={32} color="#154854" weight="duotone" />
            }
          </div>
        </div>
        <div className="input-wrapper">
          <LockKeyOpen size={36} color="#154854" weight="duotone" />
          <input 
            type={ showPassword ? "text" : "password" } 
            placeholder="repita nova senha"
            {...register("repeatNewPassword")}
          />
        </div>
        <button onClick={() => handleRedefinePassword()}>Confirmar</button>
      </section>
    </div>
  )
}