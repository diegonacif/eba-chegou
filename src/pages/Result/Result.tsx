import { useParams } from 'react-router-dom';

import eba from "../../assets/result-eba.png";
import ops from "../../assets/result-ops.png";

export const Result = () => {

  const { status } = useParams();
  
  return (
    <div className="result-container">
      { status === "undefined" ? <h1>Resultado não encontrado</h1> : null }
      { status === "true" ? <img src={eba} alt="" /> : null }
      { status === "false" ? <img src={ops} alt="" /> : null }
    </div>
  )
}