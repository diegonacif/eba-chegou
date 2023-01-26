import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { ColorSelector } from "../../components/ColorSelector/ColorSelector";
import { RedefinePassword } from "../../components/RedefinePassword/RedefinePassword";
import { XCircle } from "phosphor-react";

import "../../styles/App.css";

export const Manager = () => {
  const [componentRendered, setComponentRendered] = useState("main");
  return (
    <div className="manager-container">
      <Header />
      {
        componentRendered === "main" ?
        <section>
          <span onClick={() => setComponentRendered("color-selector")}>Seleção de cores</span>
          <span onClick={() => setComponentRendered("redefine-password")}>Redefinir senha</span>
        </section> :
        componentRendered === "color-selector" ?
        <section>
          <div className="x-wrapper" onClick={() => setComponentRendered("main")}>
            <XCircle size={40} color="#12262b" weight="fill" />
          </div>
          <ColorSelector />
        </section> :
        componentRendered === "redefine-password" ?
        <section>
          <div className="x-wrapper" onClick={() => setComponentRendered("main")}>
            <XCircle size={40} color="#12262b" weight="fill" />
          </div>
          <RedefinePassword />
        </section> :
        null
      }
    </div>
  )
}