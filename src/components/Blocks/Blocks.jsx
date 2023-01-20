import { useEffect, useState } from 'react';
import { db } from '../../services/firebase-config';
import { collection, getDocs, setDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Header } from "../Header/Header";

import "../../styles/App.css";
import { map } from '@firebase/util';


export const Blocks = () => {
  const blocksCollectionRef = collection(db, "blocks");
  const [blocks, setBlocks] = useState([]);
  const [newBlock, setNewBlock] = useState("");

  console.log(newBlock)

  // Blocks Data
  useEffect(() => {
    const getBlocks = async () => {
      const data = await getDocs(blocksCollectionRef);
      setBlocks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getBlocks();
  }, [])

  // New Block
  const createNewBlock = async () => {
    await setDoc(doc(blocksCollectionRef, newBlock), {});
  }

  return (
    <div className="blocks-container">
      <Header />
      <section>
        {blocks?.map((data, index) => (
          <div className="block-wrapper">
            <span key={data.id}>Bloco {data.id}</span>
            <button key={index}>-</button>
          </div>
        ))}
      </section>
      <input type="text" className="add-input" onChange={e => setNewBlock(e.target.value)}/>
      <button className="add-button" onClick={() => createNewBlock()}>+</button>
    </div>
  )
}