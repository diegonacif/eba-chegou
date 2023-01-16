import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { AuthEmailContext } from "../../contexts/AuthEmailProvider"
import { UserCircle, SignOut, WindowsLogo } from "phosphor-react";

export const Header = () => {
  const { logoutUser, isSignedIn } = useContext(AuthEmailContext);

  return (
    <div className="header-container">
      <h2>Eba, chegou!</h2>
      {
        isSignedIn ?
        <button onClick={() => logoutUser()}>
          <SignOut size={40} color="#154854" weight="fill" />
        </button> :
        <Link to="/auth">
          <UserCircle size={40} color="#154854" weight="fill" />
        </Link>
      }
    </div>
  )
}