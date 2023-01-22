import { db } from '../../services/firebase-config';
import { setDoc, doc } from 'firebase/firestore';
import { useRef, useState } from 'react';

import { useOnClickOutside } from 'usehooks-ts'; // Outside Click (Hook)
import { useTransition, animated } from '@react-spring/web'; // Conditional Rendering Transition Lib

import "../../styles/App.css";

export const AddButton = ({ path, isApartment, refresh }) => {
  const [name, setName] = useState("");
  const inputRef = useRef();

  // Menu open controller
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
    from: { x: 30, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 30, y: 0, opacity: 0 },
    config: {duration: 200},
  });

  // New Blocks or Apartments
  async function handleSubmit() {
    const docRef = doc(db, path, name);
    await setDoc(docRef, isApartment ? { status: false } : {}).
    then(() => {
      console.log(`O ${isApartment ? "apartamento" : "bloco"} ${name} foi criado! `)
    });
    inputRef.current.value = "";
    // refresh(prevState => !prevState);
    refresh();
  }

  return (
    <div 
      className="add-button-container"
      ref={refContainer} // Outside Click (Reference)
    >
      {
        transitions((styles, item) => item &&
          <>
            <animated.input 
              ref={inputRef} 
              placeholder={isApartment ? "apartamento" : "Digite o bloco"} 
              type="text" 
              onChange={(e) => setName(e.target.value)} 
              style={styles}
            />
          </>
        )
      }
      {
        isMenuOpen ? 
        <button className={isMenuOpen ? "button-open" : null} onClick={() => handleSubmit()}>+</button> : 
        <button onClick={() => handleMenuOpen()}>+</button>
      }
      
    </div>
  )
}