import React, {useEffect} from 'react'
import CustomFooter from '../components/CustomFooter/CustomFooter'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from 'ethers'
import { useSelector, useDispatch } from 'react-redux'
import { setWalletAddress, setWalletAmount, setContract, setInitialized, setVerified, setSigner } from '../../slices/walletSlice'
import NavSm from '../components/NavSm/NavSm'
import Asidemenu from '../components/AsideMenu/Asidemenu'
import { useRouter } from 'next/router'
import abi from '../../constants/abi.json'
export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_NEXT_PUBLIC_INFURA_ID
    }
  }
};
export default function Layout ({ children }) {
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    if(router.pathname.includes("/createcollection")){
    window.onbeforeunload = function() {
        return "Data will be lost if you leave the page, are you sure?";
      };
    }else{
      window.onbeforeunload = function() {
        return null;
      }
    }
  }, [router.pathname])
  return (
    <div className='w-100 h-screen relative'>
        <Navbar/>
        <NavSm />
        <Sidebar />
        {/* <Asidemenu /> */}
        <div className='w-80p flex flex-col' style={{marginTop:'56px'}}>
        { children }
        <Footer />
        </div>
        {/* <CustomFooter /> */}
    </div>
  )
}
