import React from "react";
import styles from "./Punks.module.scss";

function Punks() {
  return (
    <div
      className={`${styles.punks} mx-auto flex flex-col justify-start items-center relative`}
    >
      <h2 className="text-2xl text-center font-bold mb-8">
        Muy Pronto NFT de Substas <span className="text-[#fd5356]">Cripto Punks</span>
      </h2>
      <div>
          <img src="/images/punks.png" />
      </div>
    </div>
  );
}

export default Punks;
