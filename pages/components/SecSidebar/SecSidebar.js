import React, { useState, useEffect } from "react";
import styles from "./SecSidebar.module.scss";
import { BiFilter } from "react-icons/bi";
import { FaArrowLeft, FaChevronDown } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { AiFillDollarCircle } from "react-icons/ai";
import Select, { components } from "react-select";

function SecSidebar(props) {
  const { currentTab } = props;
  const [selectedvalue, setSelectedvalue] = useState();
  const [closePrice, setClosePrice] = useState(false);
  const [closeChain, setCloseChain] = useState(false);
  const [closeEstado, setCloseEstado] = useState(false);

  const options = [
    {
      label: "Dolar Estadounidense (USD)",
      value: "Todos",
      icon: <AiFillDollarCircle size={18} />,
    },
    {
      label: "Binance Smart Coin (BNB)",
      value: "Favoritos",
      icon: <AiFillDollarCircle size={18} />,
    },
  ];
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #111",
      height: "45px",
      borderRadius: "5px",
      width: "100%",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "navy" : "white",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "black",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
  return (
    <div className={`w-100 sticky top-12`}>
      <div className="w-100 p-3 px-4 border-b-[1px] flex justify-between items-center">
        <div className="flex justify-center items-center">
          <BiFilter color="#111" size={24} />
          <span className="ml-1 font-medium">Filtros</span>
        </div>
        <div className="flex justify-center items-center cursor-pointer">
          <FaArrowLeft color="#111" size={22} />
        </div>
      </div>
      <div className="w-100 p-3 px-4 border-b-[1px] flex justify-between items-center">
        <div className="flex justify-center items-center">
          <span className="font-medium">Estado</span>
        </div>
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={() => setCloseEstado(!closeEstado)}
        >
          <FiChevronDown
            color="#111"
            size={22}
            style={{ transform: `rotate(${closeEstado ? "180deg" : "0deg"})` }}
          />
        </div>
      </div>
      {!closeEstado && (
        <div className="w-full h-[150px] bg-[#FFF2F2] px-8 flex flex-col justify-center items-center relative">
          <div className="flex flex-wrap justify-between items-center relative w-full mb-3">
            <div className={`${styles.customselect}`}>Comprar Ahora</div>
            <div className={`${styles.customselect}`}>En Subasta</div>
          </div>

          <div className="flex flex-wrap justify-between items-center relative w-full">
            <div className={`${styles.customselect}`}>Neuvos</div>
            <div className={`${styles.customselect}`}>En Oferta</div>
          </div>
        </div>
      )}

      <div className="w-100 p-3 px-4 border-[1px] flex justify-between items-center">
        <div className="flex justify-center items-center">
          <span className="font-medium">Precios</span>
        </div>
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={() => setClosePrice(!closePrice)}
        >
          <FiChevronDown
            color="#111"
            size={22}
            style={{ transform: `rotate(${closePrice ? "180deg" : "0deg"})` }}
          />
        </div>
      </div>
      {!closePrice && (
        <div className="w-full h-[200px] bg-[#FFF2F2] px-8 py-5 flex flex-col justify-start items-center relative">
          <div className="w-full relative mb-4">
            <Select
              options={options}
              className="w-full"
              styles={customStyles}
              value={selectedvalue}
              onChange={(selectedvalue) => setSelectedvalue(selectedvalue)}
              getOptionLabel={(e) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>{e.icon}</div>
                  <span style={{ marginLeft: 5, fontSize: 12 }}>{e.label}</span>
                </div>
              )}
            />
          </div>
          <div className="w-full flex justify-between items-center mb-4">
            <input
              className="w-[42%] h-[45px] rounded border-[1px] border-[#111] px-2"
              type="text"
              placeholder="Minimo"
            />
            <span className="font-bold">A</span>
            <input
              className="w-[42%] h-[45px] rounded border-[1px] border-[#111] px-2"
              type="text"
              placeholder="Maximo"
            />
          </div>
          <div className="w-full flex justify-start">
            <div className={`${styles.applyButton}`}>Aplicar</div>
          </div>
        </div>
      )}
      <div className="w-100 p-3 px-4 border-[1px] flex justify-between items-center">
        <div className="flex justify-center items-center">
          <span className="font-medium">Blockchains</span>
        </div>
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={() => setCloseChain(!closeChain)}
        >
          <FiChevronDown
            color="#111"
            size={22}
            style={{ transform: `rotate(${closeChain ? "180deg" : "0deg"})` }}
          />
        </div>
      </div>
      {!closeChain && (
        <div className="w-full h-[150px] bg-[#FFF2F2] px-8 flex flex-col py-5 justify-start items-center relative">
          <div className="w-full relative mb-4 text-sm">Ethereum</div>
          <div className="w-full relative mb-4 text-sm">Polygon</div>
        </div>
      )}
    </div>
  );
}

export default SecSidebar;
