import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import jsonData from './assets/data.json';
import apartment from './assets/apartment.svg';
import './styles/App.css';
import { Link } from 'react-router-dom';

function App() {
  // Controlador Hook Form
  const {
    watch,
    register,
    setValue,
    getValues
  } = useForm({
    mode: "all",
    // defaultValues: {
    //   "strength": "10",
    //   "dexterity": "10",
    //   "inteligence": "10",
    //   "vitality": "10",
    //   "hitPoints": "10",
    //   "will": "10",
    //   "perception": "10",
    //   "fatiguePoints": "10"
    // }
  });

  const currentFloor = watch("floor");

  const [currentApts, setCurrentApts] = useState([0]);

  useEffect(() => {
    currentFloor === "1" ?
    setCurrentApts(jsonData.apt1) :
    currentFloor === "2" ?
    setCurrentApts(jsonData.apt2) :
    currentFloor === "3" ?
    setCurrentApts(jsonData.apt3) :
    currentFloor === "4" ?
    setCurrentApts(jsonData.apt4) : [];
  }, [watch("floor")])

  console.log(watch("apt"));

  return (
    <div className="main-container">
      <header>
        <h2>Eba, chegou!</h2>
        <Link to="/auth">Auth</Link>
      </header>

      <section>
        <span>Escolha o seu bloco</span>
        <div className="input-wrapper">
          <img src={apartment} alt="" />
          <select 
            id="block" 
            defaultValue={""}
            {...register("block")}
          >
            <option value="" disabled>Selecione</option>
            {jsonData.block.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {
          watch("block") !== undefined ?
          <>
            <span>Escolha o seu andar</span>
            <select 
              id="floor" 
              defaultValue={""}
              {...register("floor")}
            >
              <option value="" id="selector" disabled>Selecione</option>
              {jsonData.floor.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </> :
          null
        }
        {
          watch("floor") !== undefined ?
          <>
            <span>Agora o seu apartamento</span>
            <select 
              id="apt" 
              defaultValue={""}
              {...register("apt")}
            >
              <option value="" id="selector" disabled>Selecione</option>
              {currentApts.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </> :
          null
        }
        { 
          watch("apt") === "" || watch("apt") === undefined ?
          null :
          <Link to="/result">Confirmar</Link>
        }
        

        {/* <select id="answer" {...register("answer")}>
          <option value="yes">Chegou sua encomenda!</option>
          <option value="no">Espere mais um cadin</option>
        </select> */}
      </section>
    </div>
  )
}

export default App
