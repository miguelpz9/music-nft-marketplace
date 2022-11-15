import React, { useEffect } from "react";
import styles from "./CollectionSub.module.scss";
import { BsShareFill, BsInstagram } from "react-icons/bs";
import { AiFillWarning, AiFillStar, AiOutlineTwitter } from "react-icons/ai";
import { MdOutlineTableChart } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux'

function CollectionSub(props) {
  const {collection, fp, volume} = props;
  const language = useSelector(state => state.walletSlice.language)
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);
  const formatEthAddress = (address) => {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  };
  return (
    <div className={`${styles.collectionsub} min-h-[40vh] px-8 mb-6`}>
      <div className={` py-3 w-full flex justify-end items-center mb-6`}>
      </div>
      <div className="mt-2">
        <div
          className={`${styles.collection} w-full flex justify-center items-center font-bold text-4xl text-[#111] mb-2`}
        >
          <span className="mx-2">{collection?.name}</span>
        </div>
        <div className="w-full flex justify-center items-center font-semibold text-[14px] text-[#111] mb-2">
        <span className="text-[#111]">{language && language === "es" ? "Creado por" : "Created by"}</span> <span className="mx-2 text-[#f00]"><Link href={`/user/${collection?.owner}`} ><p>{collection?.owner}</p></Link></span>
          <div className={`${styles.premium2} flex justify-center items-center`}>
            <AiFillStar size={10} color={"#fff"} />
          </div>
        </div>
        <div className={`${styles.info} max-w-[100%] flex justify-between overflow-hidden`}>
            <div className={`w-[33%] flex flex-col justify-center h-full border-r-[1px] border-[#111]`}>
                <div className={`text-2xl font-semibold flex justify-center items-center mb-1`}>
                     <span>{collection?.totalItems}</span>
                </div>
                <div className={`text-xs text-[#777] font-semibold flex justify-center items-center mb-1 text-center`}>
                    items
                </div>
            </div>
            <div className={`w-[33%] flex flex-col justify-center h-full border-r-[1px] border-[#111]`}>
                <div className={`text-2xl font-semibold flex justify-center items-center mb-1`}>
                     <span>{collection?.owners?.length}</span>
                </div>
                <div className={`text-xs text-[#777] font-semibold flex justify-center items-center mb-1 text-center`}>
                {language && language === "es" ? "Propieatrios" : "Owners"}
                </div>
            </div>
            <div className={`w-[33%] flex flex-col justify-center h-full border-r-[1px] border-[#111]`}>
                <div className={`text-2xl font-semibold flex justify-center items-center mb-1`}>
                    {/* <FaEthereum size={20} /> */}
                    <span>{fp} BNB</span> 
                </div>
                <div className={`text-xs text-[#777] font-semibold flex justify-center items-center mb-1 text-center`}>
                {language && language === "es" ? "Precio mínimo" : "Floor price"}
                </div>
            </div>
            <div className={`w-[25%] flex flex-col justify-center h-full`}>
                <div className={`text-2xl font-semibold flex justify-center items-center mb-1`}>
                    {/* <FaEthereum size={20} />  */}
                    <span>{volume} BNB</span>
                </div>
                <div className={`text-xs text-[#777] font-semibold flex justify-center items-center mb-1 text-center`}>
                {language && language === "es" ? "Volumen" : "Volume"}
                </div>
            </div>
        </div>
        <div className={`${styles.description} mx-auto`}>
          {collection?.description}
        </div>
      </div>
    </div>
  );
}

export default CollectionSub;
