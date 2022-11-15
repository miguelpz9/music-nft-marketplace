import { Dialog, DialogContent, DialogTitle, TextField, MenuItem } from "@material-ui/core";
import React, {useState, useContext} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { providers, Contract, utils } from "ethers";
import abi from '../../../constants/collectionAbi.json';
import busdAbi from '../../../constants/busdAbi.json';
import { UserContext } from "../../../context/UserContext";
import { nusicAddress, nusicABI } from "../../../smartContract";
import {
  nusicMarketPlaceABI,
  nusicMarketPlaceAddress,
} from "../../../smartContract/NusicMarketPlaceABI&Address";
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
import * as contract from "../../../utils/contractFunctions";
import toast from "react-hot-toast";
const MARKET_PLACE_FEE = 2.5;
import { BUSDAddress } from "../../../smartContract/busdAddress&ABI";
import { createListing } from "../../../utils/contractFunctions";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const BUSD_ADDRESS = "0x4367c5463b00984AC77B8473BcaaC00a77a48F2B";

function ListDialog(props) {
  const { openList, setOpenList, data } = props;
  const { isLoggedIn, library, chainId, isUserPremium, account } = useContext(UserContext);
  const language = useSelector(state => state.walletSlice.language)
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');
  const [ethAmount, setEthAmount] = useState(0)
  const [askListingPrice, setAskListingPrice] = useState(0);
  const [askAuctionPrice, setAskAuctionPrice] = useState(0);
  const [auctionExpiresOn, setAuctionExpiresOn] = useState(0);
  const [bidAmount, setBidAmount] = useState(0);
  const [singles, setSingles] = useState(data);
  const [loading, setLoading] = useState(false);
    const currencies = {
      "BNB" : {
          name: 'BNB',
          address: "0x0000000000000000000000000000000000000000",
      },
      // {
      //     label: 'MUZI',
      //     value: '3',
      // },
      "BUSD" : {
          name: 'BUSD',
          address: BUSDAddress,
      }
    }
    const currency = [
      {
          name: 'BNB',
          address: "0x0000000000000000000000000000000000000000",
      },
      // {
      //     label: 'MUZI',
      //     value: '3',
      // },
      {
          name: 'BUSD',
          address: BUSDAddress,
      }
    ]
  const [selectedCurrency, setSelectedCurrency] = useState(currencies["BNB"]);
    const walletAmount = useSelector(state => state.walletSlice.walletAmount)
    const walletAddress = useSelector(state => state.walletSlice.walletAddress)
    const handleClose = () => {
      setOpenList(false);
    };
    const handleAmountChange = (event) => {
      setEthAmount(event.target.value)
    }
    const handleContractFunctions = async (func, extraArgs = {}) => {
      const args = { library, chainId, account, singles, ...extraArgs };
      setLoading(true);
      setSingles(await contract[func](args));
      setLoading(false);
    };
    const handleSubmit = async () => {
      console.log("LISTINGGHG");
      console.log(askListingPrice);
      const args = { library, chainId, account, singles, askListingPrice, selectedCurrency };
      console.log(args)
      setLoading(true);
      await createListing(library, chainId, account, singles, askListingPrice, selectedCurrency, false, 0);
      setLoading(false);
    }
    const handleCurrencyChange = (e) => {
      setSelectedCurrency(currencies[e.target.value])
      console.log(currencies[e.target.value]);
   }
  return (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openList}
        onClose={handleClose}
      >
        <DialogTitle>
          <div className="w-full flex justify-end">
          <div className="font-semibold text-2xl text-red-500 text-center w-[80%] mx-auto mb-12">
              {language && language === "es" ? "¿Quieres listar este NFT?" : "Do you want to list this NFT?" }
            </div>
            <span className="cursor-pointer" onClick={handleClose}>&#10005;</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className='h-[12rem] flex justify-center items-start flex-col'>
            
            <TextField
                id="outlined-select-type"
                select
                label={language && language === "es" ? "Moneda" : "Currency"}
                value={selectedCurrency.name}
                onChange={handleCurrencyChange}
                helperText={language && language === "es" ? "Selecciona la moneda" : "Select the currency"}
                variant="outlined"
                >
                {currency.map((option) => (
                    <MenuItem key={option.name} value={option.name}>
                    {option.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="bid-amount"
                label={language && language === "es" ? "Precio" : "Price"}
                value={askListingPrice}
                onChange={(e) => setAskListingPrice(e.target.value)}
                variant="outlined"
                fullWidth
                type={"number"}
            />
            <div className="flex justify-between items-center w-[80%] mx-auto relative">
              <div className="w-[35%] h-12 border-2 border-[#FF3F4D] bg-[#FF3F4D] text-white rounded cursor-pointer uppercase flex justify-center items-center font-medium text-xl" onClick={() => handleSubmit()}>
                {language && language === "es" ? "Listar" : "List"}
              </div>
              <div className="w-[35%] h-12 border-2 border-[#FF3F4D] bg-[#fff] text-[#FF3F4D] rounded cursor-pointer uppercase flex justify-center items-center font-medium text-xl" onClick={handleClose}>
                No
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ListDialog;
