import { useEffect, useState } from 'react';
import { db } from '../../services/firebase-config';
import { useForm } from 'react-hook-form';
import { collection, getDocs, setDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Header } from "../Header/Header";
import { AddButton } from '../AddButton/AddButton';

import "../../styles/App.css";



export const Apartments = () => {
  const {
    watch,
    register,
    setValue,
    getValues
  } = useForm({
    mode: "all",
  });

  const [block, setBlock] = useState(0);
  useEffect(() => {
    if(getValues("block") === undefined || getValues("block") === "") {
      return;
    } else {
      return setBlock(getValues("block"));
    }
  }, [watch("block")]);

  const blocksCollectionRef = collection(db, "blocks");
  const apartmentsCollectionRef = collection(db, `blocks/${block}/apartments`);
  const [blocks, setBlocks] = useState([]);
  const [apartments, setApartments] = useState([]);

  const [rerender, setRerender] = useState(false);
  const refresh = () => {
    setRerender(prevState => !prevState)
  }

  const [docs, loading, error] = useCollectionData(apartmentsCollectionRef);

  // Blocks Data
  useEffect(() => {
    if(block === "") {
      return;
    } else {
      const getBlocks = async () => {
        const data = await getDocs(blocksCollectionRef);
        setBlocks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      getBlocks();
    }
  }, [])

   // Apartments Data
  useEffect(() => {
    const getApartments = async () => {
      const data = await getDocs(apartmentsCollectionRef);
      setApartments(data?.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getApartments();
  }, [block, rerender])


  // Delete Apartment
  const deleteApartment = async (aptId) => {
    await deleteDoc(doc(apartmentsCollectionRef, aptId))
    .then(() => {
      console.log(`O bloco ${aptId} foi deletado!`);
    });
    refresh();
  }

  return (
    <div className="apartments-container">
      <Header />
      <section>
        <div className="block-wrapper">
          <span>Gerenciador de apartamentos</span>
          <select 
            id="block" 
            defaultValue={""}
            {...register("block")}
          >
            <option value="" disabled>Bloco ?</option>
            {blocks?.map((data) => (
              <option key={data.id} value={data.id}>{data.id}</option>
            ))}
          </select>
        </div>
        <div className="apartment-wrapper">
          {/* {loading ? "Loading..." : null} */}
          {apartments?.map(data => (
            <div className="apartment-row">
              <span key={data.id}>Apt {data.id}</span>
              <button onClick={() => deleteApartment(data.id)}>-</button>
            </div>
          ))}

        </div>
        <div className="add-button-wrapper">
          <AddButton 
            path={`blocks/${block}/apartments`} 
            isApartment={true} 
            refresh={refresh}
          />
        </div>
      </section>
    </div>
  )
}