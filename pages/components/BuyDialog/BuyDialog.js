import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React, {useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { ethers } from 'ethers';
import abi from '../../../constants/collectionAbi.json';
import busdAbi from '../../../constants/busdAbi.json';

function BuyDialog(props) {
  const { openBuy, setOpenBuy, data } = props;
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');
    const signer = useSelector(state => state.walletSlice.signer);
    const language = useSelector(state => state.walletSlice.language);
    const handleClose = () => {
      setOpenBuy(false);
    };
    const handleSubmit = async () => {
      if(!walletAddress){
        await connectWallet()
      }
      const contract = new ethers.Contract(data.collection, abi, signer);
      try {
        if(data.currency == "BNB"){
          await contract.buyToken(data.id, {value: ethers.utils.parseEther(data.price)});
        } else{
          await contract.buyToken(data.id);
        }
      } catch (error) {
        console.log('Error uploading file: ', error)
      }
    }
    const handleApprove = async () => {
      if(!walletAddress){
        await connectWallet()
      }
      const contract = new ethers.Contract("0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee", busdAbi, signer);
      try {
          await contract.approve(data.collection, ethers.utils.parseEther(data.price));
      } catch (error) {
        console.log('Error uploading file: ', error)
      }
    }
  return (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openBuy}
        onClose={handleClose}
      >
        <DialogTitle>
          <div className="w-full flex justify-end">
            <span className="cursor-pointer" onClick={handleClose}>&#10005;</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className='h-[12rem] flex justify-center items-start flex-col'>
            <div className="font-semibold text-2xl text-center w-[80%] mx-auto mb-12">
            {language && language === "es" ? "¿Quieres comprar este NFT?" : "Do you want to buy this NFT?"}
            </div>
            <div className="flex justify-between items-center w-[80%] mx-auto relative">
              {data?.currency != "BNB" ? <div className="w-[35%] h-12 border-2 border-[#FF3F4D] bg-[#FF3F4D] text-white rounded cursor-pointer uppercase flex justify-center items-center font-medium text-xl" onClick={handleApprove}>
              {language && language === "es" ? "Aprobar moneda" : "Approve currency"}
              </div> : <div className="w-[35%] h-12 border-2 border-[#FF3F4D] bg-[#FF3F4D] text-white rounded cursor-pointer uppercase flex justify-center items-center font-medium text-xl" onClick={handleSubmit}>
              {language && language === "es" ? "Comprar" : "Buy"}
              </div>}
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

export default BuyDialog;
