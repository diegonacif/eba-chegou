import { db } from '../../services/firebase-config';
import { setDoc, doc } from 'firebase/firestore';
import { useRef, useState } from 'react';

export const AddButton = ({ path, isApartment, refresh }) => {
  const [name, setName] = useState("");
  const inputRef = useRef();


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
    <div>
      <input ref={inputRef} placeholder={isApartment ? "apartamento" : "bloco"} type="text" onChange={(e) => setName(e.target.value)}/>
      <button onClick={() => handleSubmit()}>Add</button>
    </div>
  )
}