import { TextField, MenuItem, Button, InputAdornment } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import styles from "./createcollection.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { AttachMoney } from "@material-ui/icons";
import Create from "../components/create";
import FinalUpload from "../components/FinalUpload/FinalUpload";
import withAuth from "../../helpers/withAuth";
function CreateCollection() {
  const [nftData, setNftData] = useState({
    name: "",
    description: "",
    initialPrice: "",
    royalties: "",
    nftcount: "",
  });
  const [collectionList, setCollectionList] = useState([])
  const [urlList, setUrlList] = useState([])
  const [collectionCounter, setCollectionCounter] = useState(1);
  const [page, setPage] = useState(1);
  const dispacth = useDispatch();
  const [fileName, setFileName] = useState("");
  const walletAddress = useSelector((state) => state.walletSlice.walletAddress);
  const handleCollectionNftUpdate = (item) => {
    if (nftData.nftcount >= collectionCounter) {
      setUrlList([...urlList, item]);
      setCollectionCounter(collectionCounter + 1);
      if (collectionCounter === nftData.nftcount) {
        setPage(3);
        console.log("IAUHF98AQWYFMH9AOESM8FJ ", [...urlList, item]);
      }
    }
  };
  
  const handleNFTCountChange = (e) => {
    if(e.target.value <= 500) {
    setNftData({ ...nftData, nftcount: Number(e.target.value) });
    }
  };

  const handleChangeName = (e) => {
    setNftData({ ...nftData, name: e.target.value });
  };
  const handleChangeDesc = (e) => {
    setNftData({ ...nftData, description: e.target.value });
  };
  const handleInitialPriceChange = (e) => {
    setNftData({ ...nftData, initialPrice: e.target.value });
  };
  const handleRoyaltiesChange = (e) => {
    setNftData({ ...nftData, royalties: e.target.value });
  };
  const handleNextPage = () => {
    setPage(page + 1);
  }

  return (
    <>
      {page === 1 && (
        <div className="w-full h-screen flex flex-col justify-start items-center py-8">
          <h2 className="text-3xl font-semibold mb-6">
            Create your <span className="text-[#f00]">Collection</span>
          </h2>
          <div className={`${styles.form}`}>
            <div className="mb-8">
              <TextField
                variant="outlined"
                label="Collection Name"
                id="nftnameinput"
                className="mb-3"
                value={nftData.name}
                fullWidth
                onChange={handleChangeName}
              />
            </div>
            <div className="mb-8">
              <TextField
                variant="outlined"
                label="Collection Description"
                id="nftdescinput"
                className="mb-3"
                value={nftData.description}
                fullWidth
                onChange={handleChangeDesc}
              />
            </div>
            <div className="mb-8">
              <TextField
                variant="outlined"
                label="Initial Price"
                id="nftpriceinput"
                className="mb-3"
                value={nftData.initialPrice}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                onChange={handleInitialPriceChange}
              />
            </div>
            <div className="mb-8">
              <TextField
                variant="outlined"
                label="Royalties"
                id="nftroyaltyinput"
                className="mb-3"
                value={nftData.royalties}
                type="number"
                fullWidth
                onChange={handleRoyaltiesChange}
              />
            </div>
            <div className="mb-8">
              <TextField
                variant="outlined"
                label="Number of NFTs"
                id="nftnumbers"
                className="mb-3"
                value={nftData.nftcount}
                InputProps={{ inputProps: { min: 0, max: 10 } }}
                type="number"
                fullWidth
                onChange={handleNFTCountChange}
              />
            </div>
            <div>
              <Button
                className="ml-4 w-full"
                variant="contained"
                onClick={handleNextPage}
                style={{ backgroundColor: "rgb(255, 63, 77)", color: "#fff" }}
                disabled={
                  !nftData.name ||
                  !nftData.description ||
                  !nftData.initialPrice ||
                  !nftData.royalties ||
                  !nftData.nftcount
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
      {page === 2 && (
        <Create
          handleUpdate={handleCollectionNftUpdate}
          collectionCounter={collectionCounter}
          nftCount={nftData.nftcount}
        />
      )}
      {
        page === 3 && (
            <FinalUpload items={urlList} data={nftData} nftsNumber={collectionCounter} />
        )
      }
    </>
  );
}
/* items={collectionList} data={nftData}*/
export default withAuth(CreateCollection);
