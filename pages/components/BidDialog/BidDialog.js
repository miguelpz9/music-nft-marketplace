import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import React, {useState, useContext} from "react";
import { UserContext } from "../../../context/UserContext";
import { useSelector } from "react-redux";
import { createBid } from "../../../utils/contractFunctions";

function BidDialog(props) {
  const { openBid, setOpenBid, data } = props;
  const { isLoggedIn, library, chainId, isUserPremium, account } = useContext(UserContext);
    const [fullWidth, setFullWidth] = useState(true);
    const [ethAmount, setEthAmount] = useState(0)
    const [maxWidth, setMaxWidth] = useState('sm');
    const walletAmount = useSelector(state => state.walletSlice.walletAmount)
    const language = useSelector(state => state.walletSlice.language)
    const handleClose = () => {
      setOpenBid(false);
    };
    const handleAmountChange = (event) => {
        setEthAmount(event.target.value)
    }
    const placeBid = async () => {
      await createBid(library, chainId, account, data, ethAmount);
    }
  return (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openBid}
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
              {language && language === "es" ? "Porponer oferta" : "Place a Bid"}
            </div>
            <div className="w-full relative mb-4">
            <TextField
                id="bid-amount"
                label={language && language === "es" ? "Cantidad de moneda" : "Currency amount"}
                value={ethAmount}
                onChange={(e) => handleAmountChange(e)}
                variant="outlined"
                fullWidth
                helperText={`Your wallet balance is ${Number(walletAmount).toFixed(6)} ETH`}
                type={"number"}
            />
            </div>
            <div>
            <Button
            variant="contained"
            component="label"
            onClick={placeBid}
            style={{
              backgroundColor: "#f00",
              color: "#fff",
              padding: "10px 30px",
            }}
            >
                {language && language === "es" ? "Porponer oferta" : "Place a Bid"}
            </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BidDialog;
