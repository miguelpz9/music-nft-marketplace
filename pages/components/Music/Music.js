import React, {useEffect, useState} from "react";
import styles from "./Music.module.scss";
import { useSelector, useDispatch } from 'react-redux'

function Music() {
  const language = useSelector(state => state.walletSlice.language)
    useEffect(() => {
      console.log("LANGUAGE CHANGE TO: ", language);
    }, [language]);
  return (
    <div
      className={`${styles.music} mx-auto flex flex-col justify-start items-center relative`}
    >
      <h2 className="text-2xl text-center font-bold mb-8">
        <span className="text-[#fd5356]">{language === "es" ? "Lo + Sonado Hasta El Momento" : "The most listened up to the moment"}</span>
      </h2>
      <div>
      {/* <iframe src="https://player.twitch.tv/?channel=insomniac&parent=www.example.com" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620" className="mx-auto"></iframe> */}
      {/* <iframe
          src="https://player.twitch.tv/?channel=insomniac&parent=nftdemusica-preview.vercel.app/"
          height="378" width="620"
          allowFullScreen
          className="mb-12 mx-auto">
      </iframe> */}
      {/* <iframe src="/videoHome.mp4"  className="max-w-[100%] w-[900px] sm:h-[600px] h-[200px]" allow="fullscreen; picture-in-picture" ></iframe> */}
      <iframe height="560" width="1200" src="https://www.youtube.com/embed/BlLnjvTSEWU" title="Lo + sonado" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="hidden sm:flex"></iframe>
      <iframe height="180" width="360" src="https://www.youtube.com/embed/BlLnjvTSEWU" title="Lo + sonado" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="sm:hidden"></iframe>
      </div>
    </div>
  );
}
 
export default Music;
