import { useEffect, useState } from 'react';
import { db } from '../../services/firebase-config';
import { collection, getDocs, setDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Header } from "../Header/Header";

import "../../styles/App.css";
import { Apartments } from '../Apartments/Apartments';
import { AddButton } from '../AddButton/AddButton';

import loadingGif from '../../assets/724.svg';

export const Blocks = () => {
  const blocksCollectionRef = collection(db, "blocks");
  const [blocks, setBlocks] = useState([]);
  const [newBlock, setNewBlock] = useState("");

  const [rerender, setRerender] = useState(false);
  const refresh = () => {
    setRerender(prevState => !prevState)
  }

  const [docs, loading, error] = useCollectionData(blocksCollectionRef);

  // Blocks Data
  useEffect(() => {
    const getBlocks = async () => {
      const data = await getDocs(blocksCollectionRef);
      setBlocks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getBlocks();
  }, [rerender])

   // Delete Block
  const deleteBlock = async (blockId) => {
    await deleteDoc(doc(blocksCollectionRef, blockId))
    .then(() => {
      console.log(`O bloco ${blockId} foi deletado!`);
    });
    refresh();
  }

  return (
    <div className="blocks-container">
      <Header />
      <section>
        
        {
          loading ?
          <img 
            src={loadingGif} 
            alt="loading spinner" 
            id="loading" 
          /> :
          null
        }
        {blocks?.map((data, index) => (
          <div className="block-wrapper" key={Math.random()}>
            <span>Bloco {data.id}</span>
            <button onClick={() => deleteBlock(data.id)}>-</button>
          </div>
        ))}
        
      </section>
      
      <div className="add-button-wrapper">
        <AddButton 
          path={"blocks"} 
          isApartment={false}
          refresh={refresh}
        />
      </div>
      {/* <input type="text" className="add-input" onChange={e => setNewBlock(e.target.value)}/> */}
      {/* <button className="add-button" onClick={() => createNewBlock()}>+</button> */}
      {/* <button className="add-button" onClick={refresh}>+</button> */}
    </div>
  )
}
