import { TextField, Button } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import styles from "./create.module.scss";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import {
  uploadFile,
  getExtension,
  getUser,
  defaultUserData,
} from "../../utils/helpers";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux'

function InitializeAccount() {
  const { account, isLoggedIn, setUserInfo } = useContext(UserContext);
  const [userData, setUserData] = useState(defaultUserData);
  const router = useRouter()
  const [media, setMedia] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const language = useSelector(state => state.walletSlice.language)
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);

  const handleInputChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const files = {};

    if (media) {
      files.media = await uploadFile(
        `${account}/profile/`,
        media,
        `profileImage${getExtension(media.name)}`
      );
    }

    if (coverImage){
      files.coverImage = await uploadFile(
        `${account}/profile/`,
        coverImage,
        `coverImage${getExtension(coverImage.name)}`
      );
    }

    const data = {
      ...userData,
      ...files,
      address: account,
      isPremium:false,
      isInitialised: true,
    };

    await updateDoc(doc(db, "users", account), data)
      .then(() => {
        toast.success("Account Intialized successfully");
        setUserInfo(data);
      })
      .catch((error) => console.log(error));
    setUserData(defaultUserData);
    setMedia(null);
    setCoverImage(null);
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
    getUser(account).then((res) => setUserData(res));
  }, [account, isLoggedIn, router]);
    
  return (
    <div className="w-full h-screen flex flex-col justify-start items-center py-8">
      <h2 className="text-3xl font-semibold mb-6">
        Crea tu <span className="text-[#f00]">Cuenta</span>
      </h2>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField
            variant="outlined"
            label={language && language === "es" ? "Nombre de usuario" : "User Name"}
            id="nftnameinput"
            className="mb-3"
            name="name"
            value={userData.name}
            fullWidth
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            variant="outlined"
            label={language && language === "es" ? "Descripción del usuario" : "User Description"}
            id="nftdescinput"
            className="mb-3"
            name="description"
            value={userData.description}
            fullWidth
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            variant="outlined"
            label="User Social"
            id="nftdescinput"
            className="mb-3"
            name="social"
            value={userData.social}
            fullWidth
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <Button variant="contained" component="label">
            Upload cover image
            <input
              onChange={(e) => setCoverImage(e.target.files[0])}
              type="file"
              id="material-file"
              accept="image/*"
              required
            />
          </Button>

          <Button variant="contained" component="label">
            Upload profile image
            <input
              onChange={(e) => setMedia(e.target.files[0])}
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
              Inicializar cuenta
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

export default InitializeAccount