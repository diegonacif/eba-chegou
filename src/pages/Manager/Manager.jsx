import { Link } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import "../../styles/App.css";

export const Manager = () => {
  return (
    <div className="manager-container">
      <Header />
      <section>
        <Link to="#">Edição de blocos</Link>
        <Link to="#">Edição de apartamentos</Link>
        <Link to="#">Seleção de cores</Link>
        <Link to="#">Redefinir senha</Link>
      </section>
    </div>
  )
}