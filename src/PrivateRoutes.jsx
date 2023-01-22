import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import { AuthEmailContext } from "./contexts/AuthEmailProvider"

export const PrivateRoutes = () => {
  const { isSignedIn, isLoading } = useContext(AuthEmailContext);
  // console.log(isLoading)
  
  return isLoading ?
  console.log("Loading Auth Data...") :
  isSignedIn ? <Outlet /> : <Navigate to="/" />;

}