import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import { AuthEmailContext } from "./contexts/AuthEmailProvider"

export const PrivateRoutes = () => {
  const { signed } = useContext(AuthEmailContext);
  return signed ? <Outlet /> : <Navigate to="/" />;
}