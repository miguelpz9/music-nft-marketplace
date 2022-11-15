import React, {useEffect, useContext} from "react";
import styles from "./ArtistSub.module.scss";
import { BsShareFill, BsInstagram } from "react-icons/bs";
import { AiFillWarning, AiFillStar, AiOutlineTwitter, AiFillEdit } from "react-icons/ai";
import { MdOutlineTableChart } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link';
import { UserContext } from "../../../context/UserContext";

function ArtistSub(props) {
  const {artist, address} = props;
  const language = useSelector(state => state.walletSlice.language)
  const { account, isLoggedIn } = useContext(UserContext);
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);
  const formatEthAddress = (address) => {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  };
  return (
    <div className={`${styles.artistsub} h-[40vh] px-8`}>
      <div className={` py-3 w-full flex justify-end items-center mb-3`}>
        {account && account === address ? <Link href={"/profile"}>
          <span className={`${styles.icon} cursor-pointer`}>
            <AiFillEdit size={16} />
          </span>
        </Link> : <div></div>}
      </div>
      <div className="mt-2">
        <div
          className={`${styles.artist} w-full flex justify-center items-center font-bold text-4xl text-[#111] mb-4`}
        >
          <span className="mx-2">{artist?.name}</span>
          {artist?.isPremium ? <div className={`${styles.premium} flex justify-center items-center`}>
            <AiFillStar size={20} color={"#fff"} />
          </div> : <div></div>}
        </div>
        <div className={`flex w-full justify-center mb-4`}>
          <div
            className={`${styles.ethaddress} flex justify-center items-center text-[#111] px-4 py-2 rounded-full`}
          >
            <span className="mr-1">
              <FaEthereum size={16} color={"#111"} />
            </span>
            {address && formatEthAddress(address)}
          </div>
        </div>
        <div className={`flex justify-center items-center mb-3`}>
          <a href="">
            <div className="flex justify-center items-center text-[#fd5356]">
              <AiOutlineTwitter size={22} color={"#fd5356"} />
              <span className="ml-1 text-sm font-bold">{artist?.social}</span>
            </div>
          </a>
          <div className={`${styles.line}`}></div>
          <a href="">
            <div className="flex justify-center items-center text-[#fd5356]">
              <BsInstagram size={18} color={"#fd5356"} />
              <span className="ml-2 text-sm font-bold">{artist?.social}</span>
            </div>
          </a>
        </div>
        <div className={`${styles.description} mx-auto`}>
          {artist?.description}
        </div>
      </div>
    </div>
  );
}

export default ArtistSub;
