import { db } from '../../services/firebase-config';
import { collection, getDocs, setDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';
import { AddButton } from '../AddButton/AddButton';

export const Apartments = ({ path }) => {
  const apartmentsCollectionRef = collection(db, path);
  const [apartments, setApartments] = useState([]);

  const [docs, loading, error] = useCollectionData(apartmentsCollectionRef);

   // Blocks Data
  useEffect(() => {
    const getApartments = async () => {
      const data = await getDocs(apartmentsCollectionRef);
      setApartments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getApartments();
  }, [])

  return (
    <ul>
      {loading ? "Loading..." : null}
      {apartments?.map(doc => <li key={doc.id}>{doc.id}</li>)}
      <AddButton path={path} isApartment={true} />
    </ul>
  )
}