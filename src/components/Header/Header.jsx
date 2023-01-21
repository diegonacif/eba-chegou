import { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { AuthEmailContext } from "../../contexts/AuthEmailProvider";
import { UserCircle, SignOut, WindowsLogo } from "phosphor-react";
import '../../styles/App.css';
import { MenuButton } from "../MenuButton/MenuButton";



export const Header = () => {
  const { logoutUser, isSignedIn } = useContext(AuthEmailContext);

  return (
    <div className="header-container">
      <Link to="/">
        <h2>Eba, chegou!</h2>
      </Link>
      {
        isSignedIn ?
        <MenuButton /> :
        <Link to="/auth">
          <UserCircle size={40} color="#154854" weight="fill" />
        </Link>
      }
      
    </div>
  )
}