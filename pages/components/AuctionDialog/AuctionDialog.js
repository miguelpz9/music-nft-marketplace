import { Button, Dialog, DialogContent, DialogTitle, TextField, MenuItem } from "@material-ui/core";
import React, {useState, useContext} from "react";
import { useSelector } from "react-redux";
import { UserContext } from "../../../context/UserContext";
import { BUSDAddress } from "../../../smartContract/busdAddress&ABI";
import { createListing } from "../../../utils/contractFunctions";

function AuctionDialog(props) {
  const { openAuction, setOpenAuction, data } = props;
  const { isLoggedIn, library, chainId, isUserPremium, account } = useContext(UserContext);
  const language = useSelector(state => state.walletSlice.language)
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
  const times = [
    {
        label: language === "es" ? "1 día" : "1 day",
        value: 1,
    },
    {
      label: language === "es" ? "2 días" : "2 days",
      value: 2,
    },
    {
      label: language === "es" ? "3 días" : "3 days",
      value: 3,
    },
    {
      label: language === "es" ? "4 días" : "4 days",
      value: 4,
    },
    {
      label: language === "es" ? "5 días" : "5 days",
      value: 5,
    },
    {
      label: language === "es" ? "6 días" : "6 days",
      value: 6,
    },
    {
      label: language === "es" ? "7 días" : "7 days",
      value: 7,
    },
    {
      label: language === "es" ? "14 días" : "14 days",
      value: 14,
    },
    {
      label: language === "es" ? "30 días" : "30 days",
      value: 30,
    }
  ]
    const [fullWidth, setFullWidth] = useState(true);
    const [ethAmount, setEthAmount] = useState(0)
    const [timeAmount, setTimeAmount] = useState(times[0].value)
    const [maxWidth, setMaxWidth] = useState('sm');
    const [selectedCurrency, setSelectedCurrency] = useState(currencies["BNB"]);
    const walletAmount = useSelector(state => state.walletSlice.walletAmount)
    const walletAddress = useSelector(state => state.walletSlice.walletAddress)
    
    const handleCurrencyChange = (e) => {
      setSelectedCurrency(currencies[e.target.value])
      console.log(currencies[e.target.value]);
   }
    const handleClose = () => {
      setOpenAuction(false);
    };
    const initiateAuction = async () => {
      await createListing(library, chainId, account, data, ethAmount, selectedCurrency, true, timeAmount);
    };
    const handleAmountChange = (event) => {
        setEthAmount(event.target.value)
    }
    const handleTimeChange = (event) => {
      console.log(event.target.value)
      setTimeAmount(event.target.value)
    }
  return (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openAuction}
        onClose={handleClose}
      >
        <DialogTitle>
          <div className="w-full flex justify-end">
            <span className="cursor-pointer" onClick={handleClose}>&#10005;</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className='min-h-[12rem] w-full relative flex justify-start items-start flex-col pb-6'>
            <div className="font-semibold text-2xl text-center w-[80%] mx-auto mb-12">
            {language && language === "es" ? "Iniciar subasta" : "Initiate auction"}
            </div>
            <div className="w-full relative mb-4">
              <TextField
                  id="outlined-select-type"
                  select
                  label={language && language === "es" ? "Moneda" : "Currency"}
                  value={selectedCurrency.name}
                  onChange={handleCurrencyChange}
                  variant="outlined"
                  >
                  {currency.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                      {option.name}
                      </MenuItem>
                  ))}
              </TextField>
            </div>
            <div className="w-full relative mb-4">
              <TextField
                  id="bid-amount"
                  label={language && language === "es" ? "Precio Inicial" : "Initial Price"}
                  value={ethAmount}
                  onChange={(e) => handleAmountChange(e)}
                  variant="outlined"
                  fullWidth
                  type={"number"}
              />
            </div>
            <div className="w-full relative mb-4">
              <TextField
                  id="outlined-select-type"
                  select
                  label={language && language === "es" ? "Tiempo" : "Time"}
                  value={timeAmount}
                  onChange={handleTimeChange}
                  helperText={language && language === "es" ? "Selecciona tiempo de subasta" : "Select auction time"}
                  variant="outlined"
                  >
                  {times.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                      {option.label}
                      </MenuItem>
                  ))}
              </TextField>
            </div>
            <div>
            <Button
            variant="contained"
            component="label"
            onClick={initiateAuction}
            style={{
              backgroundColor: "#f00",
              color: "#fff",
              padding: "10px 30px",
            }}
            >
                {language && language === "es" ? "Iniciar subasta" : "Initiate Auction"}
            </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AuctionDialog;
