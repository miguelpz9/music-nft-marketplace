import { useState, useEffect, useContext } from "react";
import { TextField, MenuItem, Button, OutlinedInput, Select, Checkbox, ListItemText } from "@material-ui/core";
import { providers, Contract, utils, ethers } from "ethers";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  arrayUnion,
  updateDoc,
  increment,
  query,
  where,
} from "firebase/firestore";
import { UserContext } from "../../context/UserContext";
import { db } from "../../utils/firebase";
import { uploadFile } from "../../utils/helpers";
import Loader from "../components/Loader";
import styles from "./create.module.scss";
import { nusicAddress, nusicABI } from "../../smartContract";
import { BUSDAddress } from "../../smartContract/busdAddress&ABI";
import { useSelector, useDispatch } from 'react-redux'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const defaultNftData = {
  name: "",
  description: "",
  category: "",
  royalty: "",
  collectionId: null,
  tokenId: -1,
  listingId: -1,
  askPrice: 0,
  creator: "",
  isAuction: false,
  auctionExpiresOn: null,
  isAuctionClaimed: false,
  itemActivity: { list: [], sales: [], bids: [] },
  favoritedBy: [],
  currencyName: "BNB",
  ERC20TokenAddress: "0x0000000000000000000000000000000000000000"
};

const currencies = {
  BNB: "0x0000000000000000000000000000000000000000",
  BUSD: BUSDAddress,
};

function Create() {
  const { account, isLoggedIn, library, chainId, userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
const categories = [
  "banda",
  "metal",
  "reggaetón",
  "rock",
  "bachata",
  "jazz",
  "soul",
  "reggae",
  "ballenato",
  "clásico",
  "salsa",
  "pop",
  "kizomba",
  "hip hop",
  "r&b",
  "d&b",
  "baladas",
  "gospel",
  "merengue",
  "electrónica",
  "rap",
  "rancheras",
  "country",
  "lofi",
  "opera"
];  
  const [collectionList, setCollectionList] = useState([]);
  const [media, setMedia] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [nftData, setNftData] = useState(defaultNftData);
  const [nftType, setNftType] = useState(null);
  const [currency, setCurrency] = useState(currencies);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const language = useSelector(state => state.walletSlice.language)
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);
  const type = [
    {
        label:language === "es" ? 'Imagen' : 'Image',
        value:'image',
    },
    {
        label:'Video',
        value:'video',
    },
    {
        label:'Audio',
        value:'audio',
    }
  ]
  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value)
     if(value.length < 6)
    setSelectedCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
  }; 

  const handleInputChange = (e) => {
    if (
      nftData.collectionId &&
      (e.target.name === "askPrice" ||
        e.target.name === "royalty" ||
        e.target.name === "currency")
    )
      return toast.error("value cannot be changed", { duration: 1000 });

    const t = { [e.target.name]: e.target.value };
    if (e.target.name === "collectionId" && e.target.value !== null) {
      const c = collectionList.find((x) => x.id === e.target.value);
      t.askPrice = c?.price;
      t.currency = c?.currency;
      t.royalty = c?.royalty;
    }
    if (e.target.name === "currency") {
      t.currencyName =  e.target.value;
      t.ERC20TokenAddress = currencies[e.target.value];
      console.log(t.currency);
    }
    setNftData((prev) => ({ ...prev, ...t }));
  };

  // const handleInputChange = (e) => {
  //   if (nftData.collectionId && e.target.name === "askPrice")
  //     return toast.error("Price cannot be changed", { duration: 1000 });

  //   const t = { [e.target.name]: e.target.value };
  //   if (e.target.name === "collectionId" && e.target.value !== null) {
  //     t.askPrice = collectionList.find((x) => x.id === e.target.value)?.price;
  //   }
  //   setNftData((prev) => ({ ...prev, ...t }));
  // };

  const mintNFT = async () => {
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

    const tx = await contract.mint(utils.parseEther(nftData.royalty), {
      value: utils.parseEther("0.03657"),
    });

    return await tx
      .wait()
      .then(async () => {
        toast.success("You have successfully minted an NFT");
        return await contract.tokenId();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const tokenId = await mintNFT();

    const docRef = doc(collection(db, "singles"));
    const docID = docRef.id;
    const files = {};

    files.coverImage = await uploadFile(
      `${account}/singles/${docID}`,
      coverImage,
      coverImage.name
    );

    if (media) {
      files.media = await uploadFile(
        `${account}/singles/${docID}`,
        media,
        media.name
      );
    }

    await setDoc(docRef, {
      id: docID,
      ...nftData,
      currency: "0x0000000000000000000000000000000000000000",
      type: nftType,
      ...files,
      categories: selectedCategories,
      tokenId: parseInt(tokenId),
      owner: account,
      creator: account,
    })
      .then(async () => {
        if (nftData.collectionId) {
          await updateDoc(doc(db, "nftCollections", nftData.collectionId), {
            owners: arrayUnion(account),
            totalItems: increment(1),
          }).catch((error) => console.log(error));
        }
        toast.success("Singles Created Successfully");
      })
      .catch((error) => toast.error("Error :("));

    setNftData(defaultNftData);

    setLoading(false);
  };

  const handleTypeChange = (e) => {
    setNftType(e.target.value);
  }

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
    if (!userInfo.isInitialised) return router.push("/profile");

    getDocs(
      query(collection(db, "nftCollections"), where("owner", "==", account))
    )
      .then((snapshot) => setCollectionList(snapshot.docs.map((d) => d.data())))
      .catch((error) => console.log("ERROR in getting collection"));
  }, [account, isLoggedIn, router, userInfo.isInitialised]);

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center py-8">
      <h2 className="text-3xl font-semibold mb-6">
        {language && language === "es" ? "Crea tu" : "Create your"} <span className="text-[#f00]">NFT</span>
      </h2>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField
            variant="outlined"
            label={language && language === "es" ? "Nombre del NFT" : "NFT name"}
            id="nftnameinput"
            className="mb-3"
            value={nftData.name}
            fullWidth
            onChange={handleInputChange}
            name="name"
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            variant="outlined"
            label={language && language === "es" ? "Descripción" : "Description"}
            id="nftdescinput"
            className="mb-3"
            value={nftData.description}
            fullWidth
            onChange={handleInputChange}
            name="description"
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            variant="outlined"
            disabled
            id="nftauthorinput"
            className="mb-3"
            value={account}
            fullWidth
            required
          />
        </div>

        {/* MAYBE DROPDOWN */}
        <div className="mb-4">
          <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          label="Categorías"
          value={selectedCategories}
          onChange={handleCategoryChange}
          input={<OutlinedInput label="Categories" style={{color:"#111"}} />}
          renderValue={(selected) => selected.join(', ')}
          placeholder={"Categorías"}
          style={{
            width: 375,
            maxWidth:'100%'
          }}
          MenuProps={MenuProps}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={selectedCategories.includes(category)} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
        </div>

        <div className="mb-4">
          <TextField
            variant="outlined"
            label={language && language === "es" ? "Regalías (Royalties)" : "Royalties"}
            id="nftroyaltyinput"
            className="mb-3"
            value={nftData.royalty}
            type="number"
            fullWidth
            onChange={handleInputChange}
            name="royalty"
            required
          />
        </div>
{/* 
        <div className="mb-4 flex items-center">
          <TextField
            id="outlined-select-type"
            select
            label={language && language === "es" ? "Selecciona una moneda" : "Select a currency"}
            name="currency"
            value={nftData.currencyName}
            helperText={language && language === "es" ? "Selecciona una moneda" : "Select a currency"}
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

        <div className="mb-4">
          <TextField
            variant="outlined"
            label={language && language === "es" ? "Precio Inicial" : "Initial price"}
            id="nftaskpriceinput"
            className="mb-3"
            value={nftData.askPrice}
            type="number"
            fullWidth
            onChange={handleInputChange}
            name="askPrice"
            required
          />
        </div> */}

        <TextField
                id="outlined-select-type"
                select
                label={language && language === "es" ? "Tipo de NFT" : "NFT type"}
                value={nftData.type}
                onChange={handleTypeChange}
                helperText={language && language === "es" ? "Porfavor, selecciona el tipo de archivo: Imagen/Video/Audio" : "Please, select the file type: Image/Video/Audio"}
                variant="outlined"
                >
                {type.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
        </TextField>

        <div className="mb-4 flex items-center">
          <Button variant="contained" component="label">
            {language && language === "es" ? "Imagen" : "Image"}
            <input
              onChange={(e) => setCoverImage(e.target.files[0])}
              type="file"
              id="material-file"
              accept="image/*"
              required
            />
          </Button>
        </div>

        {nftType && nftType !== "image" && (
          <div className="mb-4 flex items-center">
            <Button variant="contained" component="label">
            {language && language === "es" ? "Video o Audio" : "Video or Audio"}
              <input
                onChange={(e) => setMedia(e.target.files[0])}
                type="file"
                id="material-file"
                accept={nftType == "video" ? 'video/*' : 'audio/*'}
                required
              />
            </Button>
          </div>
        )}

        <div className="mb-4 flex items-center">
          <TextField
            id="outlined-select-type"
            select
            label={language && language === "es" ? "Selecciona una colección" : "Select a collection"}
            name="collectionId"
            value={nftData.collectionId}
            onChange={handleInputChange}
            helperText={language && language === "es" ? "Porfavor, selecciona una colección" : "Please, select a collection"}
            variant="outlined"
          >
            <MenuItem value={null}>{language && language === "es" ? "Sencillos" : "Singles"}</MenuItem>
            {collectionList.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {/* CURRENCY */}
        {/* <div className="mb-4 flex items-center">
          <TextField
            id="outlined-select-type"
            select
            label="Select a collection"
            name="collectionId"
            value={currency.BNB}
            onChange={() => setCurrency(e.target.value)}
            helperText="Porfavor, selecciona el tipo de archivo: Imagen/Video/Audio"
            variant="outlined"
          >
            <MenuItem value={null}>BNB</MenuItem>
            {Object.keys(currency).map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div> */}

        {loading ? (
          <Loader />
        ) : (
          <div>
            <Button
              type="submit"
              className="ml-4 w-full"
              variant="contained"
              style={{ backgroundColor: "rgb(255, 63, 77)", color: "#fff" }}
            >
              {language && language === "es" ? "Crear NFT" : "Create NFT"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Create;
