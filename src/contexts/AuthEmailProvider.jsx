import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase-config';

export const AuthEmailContext = createContext({});

export const AuthEmailProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  console.log(registerEmail, registerPassword);

  const registerUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth, 
        registerEmail, 
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }
  // const login = async () => {

  // }
  // const logout = async () => {

  // }

  

  return (
    <AuthEmailContext.Provider value={{ 
      registerEmail, 
      setRegisterEmail, 
      registerPassword, 
      setRegisterPassword,
      registerUser
    }}>
      {children}
    </AuthEmailContext.Provider>
  )
}