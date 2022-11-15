import { TextField, Button } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import styles from "./create.module.scss";

import { UserContext } from "../../../context/UserContext";
import { useRouter } from "next/router";
import {
  uploadFile,
  getExtension,
  getUser,
  defaultUserData,
  usernameExists,
  addressExists
} from "../../../utils/helpers";
import { updateDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import Loader from "../Loader";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux'

function InitializeAccount() {
  const { account, isLoggedIn, setUserInfo } = useContext(UserContext);
  const router = useRouter();

  const [userData, setUserData] = useState(defaultUserData);
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

    if (coverImage) {
      files.coverImage = await uploadFile(
        `${account}/profile/`,
        coverImage,
        `coverImage${getExtension(coverImage.name)}`
      );
    }

    const data = {
      ...userData,
      ...files,
      isPremium:false,
      address: account,
      isInitialised: true,
    };

    console.log(data.name);
    let username = data.name.split(" ").join("");
    
    let existsName = await usernameExists(username);
    //let existsAddress = await addressExists(account);
    // let exists = false;
    // if(existsName || existsAddress){
    //   exists = true;
    // }
    if(existsName){
      let user = await getUser(username);
      console.log("NAME EXISTS: ", user);
      if(account !== user.address){
        console.log("NAME EXISTS, DIFFERENT USER")
        toast.error("Error selecting username, if its a new account, try other name");
      }
    } else{
      let user = await getUser(account);
      console.log("NAME DOESNT EXIST: ", user);
      if(user !== 0){
        if(user.name !== username){
          console.log("ACCOUNT EXISTS, DIFFERENT NAME")
          toast.error("You cannot modify your username once an account is initialized, create a new account or talk with our team");
        }
      } else{
        console.log("EVERYTHING FINE")
        await setDoc(doc(db, "users", username), data)
        .then(() => {
          toast.success("Account Intialized successfully");
          setUserInfo(data);
        })
        .catch((error) => console.log(error));
      }
    }
    // if(existsAddress){
    //   toast.error("You cannot modify your username once an account is initialized, create a new account or talk with our team");
    // }
    // if(exists){
    //   let user = await getUser(username);
    //   if(account == user.address){
    //     if(username !== user.name){
    //       toast.error("You cannot modify your username once an account is initialized, create a new account or talk with our team");
    //       return;
    //     } else{
    //       await setDoc(doc(db, "users", username), data)
    //       .then(() => {
    //         toast.success("Account Intialized successfully");
    //         setUserInfo(data);
    //       })
    //       .catch((error) => console.log(error));
    //     }
    //   } else{
    //     toast.error("Error selecting username, if its a new account, try other name, if it is alredy initialized, you cannot modify your name");
    //   }
    // } else{
    //   await setDoc(doc(db, "users", username), data)
    //   .then(() => {
    //     toast.success("Account Intialized successfully");
    //     setUserInfo(data);
    //   })
    //   .catch((error) => console.log(error));
    // }
    // await updateDoc(doc(db, "users", account), data)
    //   .then(() => {
    //     console.log("1 upload true")
    //   })
    //   .catch((error) => console.log(error));
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
        {language && language === "es" ? "Crea tu" : "Create your"} <span className="text-[#f00]">{language && language === "es" ? "Cuenta" : "Account"}</span>
      </h2>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField
            variant="outlined"
            label={language && language === "es" ? "Nombre de usuario" : "User name"}
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
            label={language && language === "es" ? "Descripción del usuario" : "User description"}
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
            label={language && language === "es" ? "@ de redes sociales" : "Social media handle"}
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
          {language && language === "es" ? "Subir portada" : "Upload cover"}
            <input
              onChange={(e) => setCoverImage(e.target.files[0])}
              type="file"
              id="material-file"
              accept="image/*"
              required
            />
          </Button>

          <Button variant="contained" component="label">
          {language && language === "es" ? "Subir foto de perfil" : "Upload profile picture"}
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
              {language && language === "es" ? "Actualizar cuenta" : "Update Account"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default InitializeAccount;
