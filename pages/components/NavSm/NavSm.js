import { Tooltip } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styles from './NavSm.module.scss'

function NavSm(props) {
    const { connectWallet } = props
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.walletSlice.walletAddress);
  const handleConnectWallet = () => {
    connectWallet();
  }
  const handleOpenMenu = () => {
    document.getElementById('asidemenu').classList.remove('hidden')
  }
  return (
    <div className="w-full h-14 shadow-md bg-white fixed top-0 left-0 px-2 sm:hidden flex items-center justify-between z-10">
      <div className={``}>
        <Link href="/">
          <img src="/icons/mainlogo.png" alt="logo" className="w-[60%]" />
        </Link>
      </div>
      <div className="flex justify-between items-center">
        {/* {walletAddress && (
          <div className={`${styles.button} uppercase px-3 py-1`}>
            <Tooltip title={walletAddress} placement="top">
              <span>{walletAddress.substring(0, 15) + "..."}</span>
            </Tooltip>
          </div>
        )}
        {!walletAddress && (
          <div
            className={`${styles.button} uppercase cursor-pointer px-3 py-1`}
            onClick={handleConnectWallet}
          >
            CONNECTA TU WALLET
          </div>
        )} */}
        <div className="" onClick={handleOpenMenu}>
          <div className="w-[35px] h-[4px] mb-1 bg-black"></div>
          <div className="w-[35px] h-[4px] mb-1 bg-black"></div>
          <div className="w-[35px] h-[4px] mb-1 bg-black"></div>
        </div>

      </div>
    </div>
  );
}

export default NavSm;
