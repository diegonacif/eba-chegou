import { useContext, useEffect, useRef, useState } from "react"

import { AuthEmailContext } from "../../contexts/AuthEmailProvider";

// Outside Click (Hook)
import { useOnClickOutside } from 'usehooks-ts'

// Conditional Rendering Transition Lib
import { useTransition, animated } from '@react-spring/web';

// Hamburguer Menu Button with Animation
import { Twirl as Hamburguer } from 'hamburger-react';

import '../../styles/App.css';
import { Link } from "react-router-dom";

export const MenuButton = () => {
  const { logoutUser, isSignedIn } = useContext(AuthEmailContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  // Outside Click (Variable)
  const refContainer = useRef(null);

  const handleClickOutside = () => {
    setIsMenuOpen(false);
  }

  useOnClickOutside(refContainer, handleClickOutside)

  // Modal Animation
  const transitions = useTransition(isMenuOpen, {
    from: { x: 10, y: -10, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 10, y: -10, opacity: 0 },
    config: {duration: 200},
  });

  return (
    <div className="menu-button-container" ref={refContainer}>
      <Hamburguer 
        toggled={isMenuOpen} 
        toggle={handleMenuOpen}
        size={30}
        duration={0.3}
        rounded
        label="abrir menu"
      />
      {/* Conditional Rendering with Transition */}
      {
        transitions(
          (styles, item) => item &&
            <animated.div className="menu-modal" style={styles} >
              <div className="menu-item">
                <Link to="/blocks">Blocos</Link>
              </div>
              <div className="menu-item">
                <Link to="#">Apartamentos</Link>
              </div>
              <div className="menu-item">
                <Link to="#">Personalizar cores</Link>
              </div>
              <hr />
              <div className="menu-item">
                <Link to="#">Redefinir senha</Link>
              </div>
              <div className="menu-item">
                <span onClick={() => logoutUser()}>Logout</span>
              </div>
            </animated.div>
        )
      }
    </div>
  )
}