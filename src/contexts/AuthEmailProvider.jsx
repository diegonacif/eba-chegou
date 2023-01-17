import { createContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
  } from 'firebase/auth'
import { auth } from '../services/firebase-config';

import { toast, ToastContainer } from 'react-toastify';

export const AuthEmailContext = createContext({});

export const AuthEmailProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setIsSignedIn(!!user);
  }, [user])

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
      isSignedIn,
      errorMsg
    }}>
      {children}
    </AuthEmailContext.Provider>
  )
}