import React, { useState, useContext, useEffect } from "react";
import { BsHeart, BsWallet, BsFillTagFill } from "react-icons/bs";
import { UserContext } from "../../../context/UserContext";
import styles from "./IndDetails.module.scss";
import { FaWallet } from "react-icons/fa";
import { providers, Contract, utils } from "ethers";
import {
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { addOwnerToCollections, getSingles } from "../../../utils/helpers";
import { nusicAddress, nusicABI } from "../../../smartContract";
import {
  nusicMarketPlaceABI,
  nusicMarketPlaceAddress,
} from "../../../smartContract/NusicMarketPlaceABI&Address";
import { Tooltip } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux'
import moment from "moment";
import BuyDialog from "../BuyDialog/BuyDialog";
import BidDialog from "../BidDialog/BidDialog";
import { cancelListing, buyListing, claimAuction } from "../../../utils/contractFunctions";
import AuctionDialog from "../AuctionDialog/AuctionDialog";
import ListDialog from "../ListDialog/ListDialog";
const MARKET_PLACE_FEE = 2.5;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const BUSD_ADDRESS = "0x4367c5463b00984AC77B8473BcaaC00a77a48F2B";
function IndDetails(props) {
  const { data } = props
  const { isLoggedIn, isUserPremium, account, library, chainId } = useContext(UserContext);
  const [selectedTab, setSelectedTab] = useState(0);
  const [openBuy, setOpenBuy] = useState(false)
  const [openBid, setOpenBid] = useState(false)
  const [openAuction, setOpenAuction] = useState(false)
  const [openList, setOpenList] = useState(false)
  const [loading, setLoading] = useState(false);
  const [askListingPrice, setAskListingPrice] = useState("");
  const [askAuctionPrice, setAskAuctionPrice] = useState("");
  const [auctionPeriod, setAuctionPeriod] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const language = useSelector(state => state.walletSlice.language)
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);
  const walletAddress = account

  const getAddressesRoyaltiesAmount = () => {
    const royalty = parseFloat(data?.royalty);
    let askPrice = parseFloat(data?.askPrice);

    askPrice -= (askPrice * MARKET_PLACE_FEE) / 100;
    const creatorFee = (askPrice * royalty) / 100;
    askPrice -= creatorFee;

    return {
      addressesSC: [data?.creator, data?.owner],
      amountSc: [
        utils.parseEther(creatorFee?.toFixed(18).toString()),
        utils.parseEther(askPrice?.toFixed(18).toString()),
      ],
    };
  };

  const delist = async () => {
    console.log(data);
    setLoading(true);
    await cancelListing(library, chainId, data);
    setLoading(false);
  };

  const buyItem = async () => {
    console.log(data);
    setLoading(true);
    await buyListing(library, chainId, account, data);
    setLoading(false);
  };

  const claimWin = async () => {
    console.log(data);
    setLoading(true);
    await claimAuction(library, chainId, data);
    setLoading(false);
  };

  return (
    <div
      className={`w-[90%] mx-auto flex relative justify-start flex-col items-start`}
    >
      <BuyDialog openBuy={openBuy} setOpenBuy={setOpenBuy} data={data} />
      <BidDialog openBid={openBid} setOpenBid={setOpenBid} data={data} />
      <AuctionDialog openAuction={openAuction} setOpenAuction={setOpenAuction} data={data} />
      <ListDialog openList={openList} setOpenList={setOpenList} data={data} />
      <div className="flex justify-between items-start mb-2">
        <span className="text-[24px] font-bold">{data?.name}</span>
      </div>
      <div className="flex mb-4">
        {data?.listingId != -1 ? <span className="font-bold text-[#aaa] text-sm">
          {language && language === "es" ? <div>En {data?.isAuction ? "subasta" : "venta"} por <span className="text-[#111]"> {data?.askPrice} {data?.currencyName}</span></div> : <div>On {data?.isAuction ? "auction" : "sale"} for <span className="text-[#111]"> {data?.askPrice} {data?.currencyName}</span></div>}
        </span> : <span className="font-bold text-[#aaa] text-sm">
          {language && language === "es" ? "No está listado para la venta" :  "Not listed for sale"}
        </span>}
      </div>
      <div className="w-[50%] mb-4">
        {data?.description}
      </div>
      <div className="flex mb-4">
        <span className="font-bold text-[#aaa] text-sm">
          {language  && language === "es" ? "Regalías del autor" : "Author royalties"} <span className="text-[#111]">{data?.royalty}%</span>
        </span>
      </div>
      {/*account && data?.favoritedBy.includes(account) ? (
        <span
          onClick={() => handleLikeOrUnlike("unlike")}
          className="p-4 bg-orange-300 border-2 cursor-pointer"
        >
          unlike
        </span>
      ) : (
        <span
          onClick={() => handleLikeOrUnlike("like")}
          className="p-4 bg-blue-300 border-2 cursor-pointer"
        >
          like
        </span>
      )*/}

      {account && data?.listingId === -1 && account === data.owner && (
        <>
          <div className={`${styles.buynow} mr-4 flex items-center`} onClick={()=>setOpenList(true)}>
          <span className="mr-2">
            <FaWallet />
          </span>
          {language && language === "es" ? "Listar" : "List"}
        </div>
        </>
      )}
      {account && data?.listingId === -1 && account === data.owner && (
        <>
          <div className={`${styles.placebid} flex items-center`} onClick={()=>setOpenAuction(true)}>
          <span className="mr-2">
            <BsFillTagFill size={22} />
          </span>
          {language && language === "es" ? "Iniciar Subasta" : "Start Auction"}
        </div>
        </>
      )}
      {account &&
        data?.listingId !== -1 &&
        !data?.isAuction &&
        data?.owner !== account && (
          <div className={`${styles.buynow} mr-4 flex items-center`} onClick={buyItem}>
          <span className="mr-2">
            <FaWallet />
          </span>
          {language && language === "es" ? "Comprar Ahora" : "Buy Now"}
        </div>
        )}

      {account && data?.isAuction && account !== data?.owner && (
        <>
          <div className={`${styles.buynow} mr-4 flex items-center`} onClick={()=>setOpenBid(true)}>
          <span className="mr-2">
            <FaWallet />
          </span>
          {language && language === "es" ? "Pujar" : "Subastar"}
        </div>
        </>
      )}

      {account &&
        data?.isAuction &&
        Date.now() < new Date(data?.auctionExpiresOn) &&
        account !== data?.owner && (
          <>
            <div className={`${styles.placebid} flex items-center`} onClick={claimWin}>
              <span className="mr-2">
                <BsFillTagFill size={22} />
              </span>
              {language && language === "es" ? "Recibir Subasta" : "Claim Auction"}
            </div>
          </>
        )}

      {account && data?.listingId !== -1 && account === data?.owner && (
        <>
          <div className={`${styles.buynow} mr-4 flex items-center`} onClick={delist}>
            <span className="mr-2">
              <FaWallet />
            </span>
            {language && language === "es" ? "Delistar" : "Delist"}
          </div>
        </>
      )}
      {/*<div>{data.owner != walletAddress ? <div className="flex mb-4">
        {data.listingId > -1 ? <div className={`${styles.buynow} mr-4 flex items-center`} onClick={()=>buyListing()}>
          <span className="mr-2">
            <FaWallet />
          </span>
          Comprar ahora
        </div> : <div className={`${styles.buynow} mr-4 flex items-center`} onClick={()=>setOpenList(true)}>
          <span className="mr-2">
            <FaWallet />
          </span>
          No listado
        </div>}
        {data.isAuction ? <div className={`${styles.placebid} flex items-center`} onClick={()=>setOpenBid(true)}>
          <span className="mr-2">
            <BsFillTagFill size={22} />
          </span>
          Pujar
        </div> : <div className={`${styles.placebid} flex items-center`} onClick={()=>setOpenBid(false)}>
          <span className="mr-2">
            <BsFillTagFill size={22} />
          </span>
          No disponible
        </div>}
      </div> : <div className="flex mb-4">
        {data.listingId > -1 ? <div className={`${styles.buynow} mr-4 flex items-center`} onClick={()=>setOpenList(true)}>
          <span className="mr-2">
            <FaWallet />
          </span>
          Delistar
        </div> : <div className={`${styles.buynow} mr-4 flex items-center`} onClick={()=>setOpenList(true)}>
          <span className="mr-2">
            <FaWallet />
          </span>
          Listar
        </div>}
        <div className={`${styles.placebid} flex items-center`} onClick={()=>setOpenBid(true)}>
          <span className="mr-2">
            <BsFillTagFill size={22} />
          </span>
          Iniciar Subasta
        </div>
      </div>}</div>*/}
      <div className="flex justify-start items-center w-full border-b-[1px]">
        <div
          className={`py-2 px-6 cursor-pointer font-semibold ${
            selectedTab === 0 ? styles.active : ""
          }`}
          onClick={() => setSelectedTab(0)}
        >
          {language && language === "es" ? "Detalles" : "Details"}
        </div>
        <div
          className={`py-2 px-6 cursor-pointer font-semibold ${
            selectedTab === 1 ? styles.active : ""
          }`}
          onClick={() => setSelectedTab(1)}
        >
          {language && language === "es" ? "Subastas" : "Bids"}
        </div>
        <div
          className={`py-2 px-6 cursor-pointer font-semibold ${
            selectedTab === 2 ? styles.active : ""
          }`}
          onClick={() => setSelectedTab(2)}
        >
          {language && language === "es" ? "Historia" : "History"}
        </div>
      </div>
      {selectedTab === 0 && (
        <div className="w-full py-3 max-h-[80vh] overflow-y-auto">
          <div className={`flex flex-col mb-8`}>
            <div className={`font-bold text-[#aaa] mb-2`}>{language && language === "es" ? "Dueño" : "Owner"}</div>
            <div>
              <span className="text-[#111] text-sm font-bold">
                {data?.owner}
              </span>
            </div>
          </div>
          <div className={`flex flex-col mb-8`}>
            <div className={`font-bold text-[#aaa] mb-2`}>{language && language === "es" ? "Categoría" : "Category"}</div>
            {
              data?.categories && data?.categories.map((item, index) =>{
                return(
                  <div key={index} className="flex justify-start items-start gap-[5%] flex-wrap">
                    <div
                      className={`px-4 py-1 rounded border-[2px] border-[#f00] mb-3`}
                    >
                      {item}
                    </div>
                  </div>
                )
              })
            }
            
          </div>
        </div>
      )}
      {selectedTab === 1 && (
        <div className="w-full py-3 max-h-[80vh] overflow-y-auto relative">
         {data?.itemActivity.bids.length > 0 ? <div>{
              data?.itemActivity.bids && data?.itemActivity.bids.map((item, index) =>{
                return(
                  <div key={index} className="flex items-center sm:w-[80%] w-full sm:h-12 h-14 bg-white border-[1px] mb-2 shadow-sm shadow-red-200 rounded relative px-2 py-1">
                    <div className={`h-9 w-9 rounded-full bg-[#f00] mr-3`}></div>
                    <div className="flex flex-col h-full justify-between">
                        <div className="font-bold text-sm">{item.price} BNB <span className="text-[#aaa]"> &nbsp; {language && language === "es" ? "por" : "by"} &nbsp;</span> <Tooltip title={item.from} placement="top"><span>{item.from.substring(0,10) + '...' + item.from.substring(38,item.from.length) }</span></Tooltip>  </div>
                        <div className="text-[10px] font-semibold text-[#888]">{moment(new Date()).format("DD/mm/yyyy, HH:mm")}</div>
                    </div>
                  </div>
                )
              })
            }</div> : <h3>{language && language === "es" ? "No hay subastas" : "There are no bids"}</h3>}
        </div>
      )}
      {selectedTab === 2 && (
        <div className="w-full py-3 max-h-[80vh] overflow-y-auto relative">
          {data?.itemActivity.sales.length > 0 ? <div>{
              data?.itemActivity.sales && data?.itemActivity.sales.map((item, index) =>{
                return(
                  <div key={index} className="flex items-center sm:w-[80%] w-full sm:h-12 h-14 bg-white border-[1px] mb-2 shadow-sm shadow-red-200 rounded relative px-2 py-1">
                    <div className={`h-9 w-9 rounded-full bg-[#f00] mr-3`}></div>
                    <div className="flex flex-col h-full justify-between">
                        <div className="font-bold text-sm"><span className="text-[#aaa]"> {language && language === "es" ? "Precio" : "Price"} &nbsp; </span><span className="font-bold text-sm">{item.price} BNB </span></div>
                        <div className="text-[10px] font-semibold text-[#888]"><span className="text-[#aaa]"> {language && language === "es" ? "Comprado por" : "Bought by"} &nbsp;  </span> <Tooltip title={item.to} placement="top"><span style={{color:'#111'}}>{item.to.substring(0,10) + '...' + item.to.substring(38,item.to.length) }</span></Tooltip> &nbsp;{/*moment(new Date()).format("DD/mm/yyyy, HH:mm")*/}</div>
                    </div>
                  </div>
                )
              })
            }</div>  : <h3>{language && language === "es" ? "No hay historia" : "There is no history"}</h3>}
        </div>
      )}
    </div>
  );
}

export default IndDetails;
