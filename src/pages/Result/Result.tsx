import eba from "../../assets/result-eba.png";
import ops from "../../assets/result-ops.png";

export const Result = () => {

  const result = false;
  
  return (
    <div className="result-container">
      { result ? <img src={eba} alt="" /> : null }
      { !result ? <img src={ops} alt="" /> : null }
    </div>
  )
}