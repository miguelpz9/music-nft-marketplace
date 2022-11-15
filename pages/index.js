import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux"
import { increment, decrement } from "../slices/counterSlice";
import ArtistCarousel from "./components/ArtistCarousel/ArtistCarousel";
import HomeEvents from "./components/HomeEvents/HomeEvents";
import HomeTop from "./components/HomeTop/HomeTop";
import Music from "./components/Music/Music";
import Navbar from "./components/Navbar/Navbar";
import HomeNewsletter from "./components/HomeNewsletter/HomeNewsletter";
import HomeCategories from "./components/HomeCategories/HomeCategories";
import TopCollections from "./components/TopCollections/TopCollections";
import TopDrops from "./components/TopDrops/TopDrops";
// import HomeStyles from './sass/Home.module.scss';
import styles from './sass/Home.module.scss';
import Asidemenu from "./components/AsideMenu/Asidemenu";


export default function Home() {
  const dispatch = useDispatch()
  const language = useSelector(state => state.walletSlice.language)
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);
  return (
    <div className={`${styles.home} flex w-full justify-start flex-col items-center`}>
      <HomeTop />
      <h2 className="text-[#fd5356] text-2xl text-center font-bold mt-24 mb-12" id='helpcenter'>{language === "es" ? "El futuro de la música ya está aquí" : "The future of music is already here"}</h2>
      <div>
          <img src="/images/banner.jpeg" />
      </div>
      <h2 className="text-[#fd5356] text-2xl text-center font-bold mt-12">{language === "es" ? "En VIVO" : "LIVE"}</h2>
      <iframe
          src="https://player.twitch.tv/?channel=insomniac&parent=www.nftdemusica.com"
          height="560" width="1200"
          allowFullScreen
          className="my-12 -mb-12 mx-auto hidden sm:flex">
      </iframe>
      <iframe
          src="https://player.twitch.tv/?channel=insomniac&parent=www.nftdemusica.com"
          height="180" width="360"
          allowFullScreen
          className="my-12 -mb-12 mx-auto sm:hidden">
      </iframe>
      <Asidemenu />
      <ArtistCarousel />
      <TopCollections />
      <HomeEvents />
      <h2 className="text-[#fd5356] text-2xl text-center font-bold mt-24 mb-12" id='helpcenter'>{language === "es" ? "Centro de ayuda" : "Help center"}</h2>
      <div className='flex flex-col xl:max-w-[40%] max-w-[80%] mx-auto mb-24'>
        <img src={language === "es" ? "./images/METAMASK_NFTDEMUSICA.jpeg" : "./images/METAMASK_NFTDEMUSICA_ENGLISH.jpeg"}  className='mx-auto mb-12 w-full h-auto'/>
        <img src={language === "es" ? "./images/createnft_nftdemusica.jpeg" : "./images/createnft_nftdemusica_english.jpeg"}  className='mx-auto w-full h-auto'/>
      </div>
      <h2 className="text-[#fd5356] text-2xl text-center font-bold mb-12" id='helpcenter'>{language === "es" ? "Código QR metamask" : "Metamask QR code"}</h2>
      <img src="./images/qrcode.jpeg"  className='mx-auto mb-12 w-[20%] h-auto'/>
      <div className='mb-24'>
          <img src="/images/banner.jpeg" />
      </div>
      <Music />
      <img src="./images/nftdemusica_logo_new.jpeg"  className='mx-auto xl:max-w-[40%] max-w-[80%] mt-36 w-full h-auto'/>
      <HomeCategories />
      <HomeNewsletter />
    </div>
  )
}
