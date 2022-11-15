import { useRouter } from "next/router";
import { AttachMoney } from "@material-ui/icons";
import { doc, collection, setDoc } from "firebase/firestore";
import { providers, Contract, utils } from "ethers";
import { useState, useEffect, useContext } from "react";
import { TextField, Button, InputAdornment, MenuItem } from "@material-ui/core";
import toast from "react-hot-toast";

import { db } from "../../utils/firebase";
import { uploadFile } from "../../utils/helpers";
import { UserContext } from "../../context/UserContext";
import { nusicAddress, nusicABI } from "../../smartContract";
import Loader from "../components/Loader";
import styles from "./createcollection.module.scss";
import { useSelector, useDispatch } from 'react-redux'

const COLLECTION_CREATION_PRICE = "0.18289";

import { BUSDAddress } from "../../smartContract/busdAddress&ABI";

const currencies = {
  BNB: "0x0000000000000000000000000000000000000000",
  BUSD: BUSDAddress,
};

const defaultCollectionData = {
  name: "",
  description: "",
  price:0,
  royalty: "",
  coverImage: "",
  totalItems: 0,
  owners: [],
  currencyName: "BNB", 
  ERC20TokenAddress: currencies.BNB
};

function CreateCollection() {
  const router = useRouter();
  const { account, isLoggedIn, library, chainId, userInfo } =
    useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [collectionData, setCollectionData] = useState(defaultCollectionData);
  const language = useSelector(state => state.walletSlice.language)
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);

  const handleInputChange = (e) => {
    if (e.target.name === "currency") {
      setCollectionData((prev) => ({
        ...prev,
        currencyName: e.target.value,
        ERC20TokenAddress: currencies[e.target.value],
      }));
    } else {
      setCollectionData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const createCollection = async () => {
    if (library.connection.url !== "metamask") {
      library.provider.http.connection.url = RPC_NETWORK_URLS[chainId];
    }

    const provider = await library.provider;
    const web3Provider = new providers.Web3Provider(provider);

    const contract = new Contract(
      nusicAddress,
      nusicABI,
      web3Provider.getSigner()
    );

    await (
      await contract.createCollection({
        value: utils.parseEther(COLLECTION_CREATION_PRICE),
      })
    )
      .wait()
      .catch((error) => toast.error("Something went wrong"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await createCollection();

    const docRef = doc(collection(db, "nftCollections"));
    const docID = docRef.id;

    const media = await uploadFile(
      `${account}/nftCollections/${docID}`,
      coverImage,
      coverImage.name
    );

    await setDoc(docRef, {
      id: docID,
      ...collectionData,
      coverImage: media,
      owner: account,
    })
      .then(() => toast.success("NFT Collection Created Successfully"))
      .catch((error) => toast.error("Error :("));

    setCollectionData(defaultCollectionData);
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
    if (!userInfo.isInitialised) return router.push("/profile");
  }, [isLoggedIn, router, userInfo.isInitialised]);

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center py-8">
      <h2 className="text-3xl font-semibold mb-6">
      {language && language === "es" ? "Crea tu" : "Create your"} <span className="text-[#f00]">{language && language === "es" ? "colección" : "collection"}</span>
      </h2>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className="mb-8">
          <TextField
            variant="outlined"
            label={language && language === "es" ? "Nombre" : "Name"}
            id="nftnameinput"
            className="mb-3"
            value={collectionData.name}
            fullWidth
            name="name"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-8">
          <TextField
            variant="outlined"
            label={language && language === "es" ? "Descipción" : "Description"}
            id="nftdescinput"
            className="mb-3"
            value={collectionData.description}
            fullWidth
            name="description"
            onChange={handleInputChange}
            required
          />
        </div>
        {/* <div className="mb-4 flex items-center">
          <TextField
            id="outlined-select-type"
            select
            label={language && language === "es" ? "Seleccionar moneda" : "Select currency"}
            name="currency"
            value={collectionData.currencyName}
            helperText={language && language === "es" ? "Seleccionar moneda" : "Select currency"}
            onChange={handleInputChange}
            variant="outlined"
          >
            {Object.keys(currencies).map((key, index) => (
              <MenuItem key={index} value={key}>
                {key}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="mb-8">
          <TextField
            variant="outlined"
            label={language && language === "es" ? "Precio inicial" : "Initial price"}
            id="nftpriceinput"
            className="mb-3"
            value={collectionData.price}
            type="number"
            name="price"
            fullWidth
            onChange={handleInputChange}
            required
          />
        </div> */}
        <div className="mb-8">
          <TextField
            variant="outlined"
            label={language && language === "es" ? "Regalías (Royalties)" : "Royalties"}
            id="nftroyaltyinput"
            className="mb-3"
            type="number"
            value={collectionData.royalty}
            fullWidth
            name="royalty"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <Button variant="contained" component="label">
          {language && language === "es" ? "Portada" : "Cover"}
            <input
              onChange={(e) => setCoverImage(e.target.files[0])}
              type="file"
              id="material-file"
              accept="image/*"
              required
            />
          </Button>
        </div>

        <div>
          {loading ? (
            <Loader />
          ) : (
            <Button
              className="ml-4 w-full"
              variant="contained"
              type="submit"
              style={{ backgroundColor: "rgb(255, 63, 77)", color: "#fff" }}
            >
              {language && language === "es" ? "Crear colección" : "Create collection"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateCollection;
