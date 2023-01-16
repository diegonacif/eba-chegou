import { createContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
  } from 'firebase/auth'
import { auth } from '../services/firebase-config';

export const AuthEmailContext = createContext({});

export const AuthEmailProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // console.log(loginEmail, loginPassword);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

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
  const loginUser = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth, 
        loginEmail, 
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }
  const logoutUser = async () => {
    try {
      await signOut(auth);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  

  return (
    <AuthEmailContext.Provider value={{ 
      registerEmail, 
      setRegisterEmail, 
      registerPassword, 
      setRegisterPassword,
      setLoginEmail,
      setLoginPassword,
      registerUser,
      loginUser,
      logoutUser,
      signed: !!user,
      user
    }}>
      {children}
    </AuthEmailContext.Provider>
  )
}