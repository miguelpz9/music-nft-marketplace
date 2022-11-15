import React, {useEffect} from 'react'
import styles from './HomeTop.module.scss'
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'
export default function HomeTop () {
  const language = useSelector(state => state.walletSlice.language)
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);
  return (
    <div className={`${styles.hometop} relative`} id="hometop">
        <div className={`${styles.hometopCover} w-full h-full text-white flex justify-center items-center flex-col`}>
            <div className={`${styles.homeTitle} uppercase`}>
                {language && language === "es" ? "Crea tu nft en 3 pasos" : "Create your nft in 3 steps"}
            </div>
            <div className='flex justify-between items-center sm:w-5/12 w-10/12 mb-6'>
              <div className={`h-8 w-8 flex justify-center items-center border-2 border-white rounded-full`}>
                1
              </div>
              <div className='flex-grow border-b border-white'></div>
              <div className={`h-8 w-8 flex justify-center items-center border-2 border-white rounded-full`}>
                2
              </div>
              <div className='flex-grow border-b border-white'></div>
              <div className={`h-8 w-8 flex justify-center items-center border-2 border-white rounded-full`}>
                3
              </div>
            </div>
            <div className='flex justify-around items-center sm:w-7/12 w-full mb-4'>
                <div className={`${styles.button}`}>
                  <a href="https://metamask.io/">{language && language === "es" ? "Mintea" : "Mint"}</a>
                </div>
                <div className={`${styles.button}`} >
                  <a href="https://metamask.io/">{language && language === "es" ? "Vende" : "Sell"}</a>
                </div>
                <div className={`${styles.button}`}>
                  <a href="https://metamask.io/">{language && language === "es" ? "Colecciona" : "Collect"}</a>
                </div>
            </div>
            <div className={`${styles.endText} text-center uppercase`}>
            {language && language === "es" ? "Vive la experiencia cripto musical" : "Live the music-crypto experience"}
            </div>
        </div>
    </div>
  )
}
