import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import { AuthEmailContext } from "./contexts/AuthEmailProvider"

export const PrivateRoutes = () => {
  const { isSignedIn } = useContext(AuthEmailContext);
  return isSignedIn ? <Outlet /> : <Navigate to="/" />;
}