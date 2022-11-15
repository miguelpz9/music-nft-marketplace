import React, { useState, useEffect } from 'react'
import { BiHeart, BiTimer } from 'react-icons/bi'
import { FaEthereum, FaPause, FaPlay } from 'react-icons/fa'
import styles from './ItemCards.module.scss'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

function ItemCards(props) {
    const { id, item } = props
    const router = useRouter()
    const [play, setPlay] = useState(false)
    const language = useSelector(state => state.walletSlice.language)
    useEffect(() => {
      console.log("LANGUAGE CHANGE TO: ", language);
    }, [language]);
    const handleClick = () => {
        router.push(`/asset/${id}`)
    }
    const handlePlay = (audioId, type="audio") => {
        console.log(play ? "Play" : "Pause")
        let audio = document.getElementById(audioId);
        if(type === "audio"){
            audio.volume = 0.2;
        }
        let audios = document.querySelectorAll(".special-audio")
        let videos = document.querySelectorAll(".special-video")
        audios.forEach((sound) => {
            sound.pause()
            sound.currentTime = 0;
        })
        videos.forEach((video) => {
            video.pause()
            video.currentTime = 0;
        })
        if(!play){
            audio.play();
            setPlay(true);
        }else{
            audio.pause();
            setPlay(false)
        }
    }
    console.log("LKAJJA", item)
  return (
    <div
      className={`w-full h-[300px] shadow-red-400 shadow-md relative flex flex-col rounded-[5px] bg-white overflow-hidden`}
    >
      <div className={`h-[70%] w-full relatve overflow-hidden`}>
        <img
          src={item?.coverImage}
          className="w-full h-full object-cover"
          alt=""
        />
        {item?.type === "audio" && (
            <>
            <div className="w-[40px] h-[40px] absolute top-[15px] right-[15px] rounded-full bg-gray-300 flex justify-center items-center cursor-pointer" onClick={() => handlePlay("special-audio" + item?.tokenId)}>
                {
                    !play ? <FaPlay size={16} color={"#111"} /> : <FaPause size={16} color={"#111"} />
                }
            </div>
            <audio src={item?.media} className="special-audio absolute bottom-0 left-0 w-full" id={"special-audio" + item?.tokenId} onPlay={()=>setPlay(true)} onPause={()=>setPlay(false)} />
            </>
        )}
        {item?.type === "video" && (
            <>
                <div className="w-[40px] h-[40px] absolute top-[15px] right-[15px] rounded-full bg-gray-300 flex justify-center items-center cursor-pointer" onClick={() => handlePlay("special-video" + item?.tokenId, item?.type)}>
                    {
                        !play ? <FaPlay size={16} color={"#111"} /> : <FaPause size={16} color={"#111"} />
                    }
                </div>
                <video src={item?.media} className={`special-video h-[70%] absolute top-0 left-0 w-full object-cover ${play ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} id={"special-video" + item?.tokenId} controls onPlay={()=>setPlay(true)} onPause={()=>setPlay(false)} />  
            </>
        )}
      </div>
      <div className={`h-[20%] w-full p-2 pb-1 flex flex-col`}>
        <div className="flex w-full justify-between mb-1">
          <span className="text-[10px] font-medium text-[#aaa]">
            {item?.creator}
          </span>
          <span className="text-[10px] font-medium text-[#aaa]">Precio</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-normal text-[#111]">
            {item?.name}
          </span>
          <div className="text-[14px] flex items-center font-normal text-[#111]">
            {/* <FaEthereum size={14} /> */}
            <span className="ml-1">{item?.askPrice}</span>
            <span className="ml-1 font-bold">{item?.currencyName}</span>
          </div>
        </div>
      </div>
      <div
        className="h-[10%] justify-self-end flex items-center bg-red-500 text-[14px] cursor-pointer text-white font-bold justify-center px-2"
        onClick={handleClick}
      >
        {language && language === "es" ? "Ver NFT" : "See NFT"}
      </div>
    </div>
  );
}

export default ItemCards