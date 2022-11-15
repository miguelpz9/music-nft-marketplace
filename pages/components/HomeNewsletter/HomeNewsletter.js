import React, {useEffect, useState} from 'react'
import styles from './HomeTop.module.scss'
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import toast from "react-hot-toast";

export default function HomeNewsletter () {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const language = useSelector(state => state.walletSlice.language)
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);

  const handleSend = async () => {
    if(name !== "" && mail !== ""){
      await setDoc(doc(db, "newsletter", mail), {
        name,
        mail,
        phone
      })
      .then(() => toast.success("Subscribed successfully!"))
      .catch((error) => toast.error("Error :("));
    } else{
      toast.error("Fill name and email")
    }
  };

  return (
    <div className={`${styles.hometop} relative`} id="subscribe">
        <div className={`${styles.hometopCover} w-full h-full text-white flex justify-center items-center flex-col`}>
            <div className={`${styles.homeTitle}`}>
                {language && language === "es" ? "Suscríbete a NFT de Música" : "Subscribe to NFT de Música"}
            </div>
            <div className={`${styles.endText} text-center`}>
              <p className='text-sm'>{language && language === "es" ? "Y te mantendremos informado de todo por email" : "And we will keep you informed of everything trough email"}</p>
            </div>
            <div className='flex justify-around items-center sm:w-7/12 w-full mb-4'>
              <div className={`${styles.button}`}>
                <input className={`${styles.input}`} type="text" placeholder={language && language === "es" ? "*Nombre" : "*Name"} onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className={`${styles.button}`} >
                <input className={`${styles.input}`} type="text" placeholder={language && language === "es" ? "*E-Mail" : "*E-mail"} onChange={(e) => setMail(e.target.value)}/>
              </div>
              <div className={`${styles.button}`}>
                <input className={`${styles.input}`} type="text" placeholder={language && language === "es" ? "Número Telefónico" : "Phone Number"} onChange={(e) => setPhone(e.target.value)}/>
              </div>
            </div>
              <div className={`${styles.button}`} onClick={handleSend}>
                {language && language === "es" ? "Enviar" : "Send"}
              </div>
        </div>
    </div>
  )
}
