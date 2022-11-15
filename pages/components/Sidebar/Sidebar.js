import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.scss";
import { FiHome } from "react-icons/fi";
import { RiMedalLine } from "react-icons/ri";
import { ImList } from "react-icons/im";
import { IoMdStar } from "react-icons/io";
import { IoIosPeople } from "react-icons/io";
import { GiBackwardTime } from "react-icons/gi";
import { BsGlobe } from "react-icons/bs";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux'
import { setLanguage, setSidebarOpen, setMouseOver } from "../../../slices/walletSlice";

const Sidebar = () => {
  //const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dispatch = useDispatch()
  const language = useSelector(state => state.walletSlice.language)
  const isSidebarOpen = useSelector(state => state.walletSlice.sidebarOpen)
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);
  const hoverEffectEnter = (e) => {
    dispatch(setSidebarOpen(true));
  };
  const hoverEffectLeave = (e) => {
    dispatch(setSidebarOpen(false));
  };
   const handleCategoryOpen = (e) => {
    setIsCategoryOpen(true);
   }
   const handleCategoryClose = (e) => {
    setIsCategoryOpen(false);
   }

   const switchToEnglish = () => {
    dispatch(setLanguage("en"))
   }
   const switchToSpanish = () => {
    dispatch(setLanguage("es"))
   }

  return (
    <div
      className={`${
        isSidebarOpen ? styles.sidebarOpen : styles.sidebar
      } fixed top-14 left-0 bg-white shadow-md hidden sm:flex`}
      onMouseEnter={hoverEffectEnter}
      onMouseLeave={hoverEffectLeave}
    >
      {!isSidebarOpen && (
        <div className="w-full flex flex-col justify-around relative h-full py-10">
          <div
            className={`${styles.logos} w-full h-full flex flex-col items-center`}
          >
            <div className="mb-6">
              <FiHome size={18} color={"#FF404D"} />
            </div>
            {/* <div className="mb-6">
              <RiMedalLine size={18} color={"#FF404D"} />
            </div> */}
            {/* <div className="mb-6">
              <ImList size={16} color={"#FF404D"} />
            </div> */}
            <div className="mb-6">
              <IoMdStar size={20} color={"#FF404D"} />
            </div>
            {/* <div className="mb-6">
              <IoIosPeople size={20} color={"#FF404D"} />
            </div> */}
            {/* <div className="mb-6">
              <GiBackwardTime size={20} color={"#FF404D"} />
            </div> */}
            <div className="mb-6">
              <BsGlobe size={16} color={"#FF404D"} />
            </div>
          </div>
          <div
            className={`${styles.socials} w-full h-full flex flex-col items-center`}
          >
            <div className={`${styles.socialIcon} mb-2 relative`}>
              <img src="/icons/facebook.png" alt="facebook" />
            </div>
            <div className={`${styles.socialIcon} mb-2 relative`}>
              <img src="/icons/instagram.png" alt="instagram" />
            </div>
            <div className={`${styles.socialIcon} mb-2 relative`}>
              <img src="/icons/spotify.png" alt="spotify" />
            </div>
            <div className={`${styles.socialIcon} mb-2 relative`}>
              <img src="/icons/youtube.png" alt="youtube" />
            </div>
            <div className={`${styles.socialIcon} mb-2 relative`}>
              <img src="/icons/twitter.png" alt="twitter" />
            </div>
            <div className={`${styles.socialIcon} mb-2 relative`}>
              <img src="/icons/discord.png" alt="discord" />
            </div>
            <div className={`${styles.socialIcon} mb-2 relative`}>
              <img src="/icons/github.png" alt="github" />
            </div>
          </div>
        </div>
      )}
      {isSidebarOpen && (
        <div className="w-full flex flex-col justify-start relative h-full py-10 px-3 pr-6">
          <div className="flex flex-col items-start justify-start mb-6">
            <div
              className={`flex justify-start items-center text-lg font-bold mb-3`}
            >
              <span className="uppercase mr-4 text-[#FF404D]">{language && language === "es" ? "Principal" : "Main"}</span>
              <FiHome size={18} color={"#FF404D"} />
            </div>
            <div className={`${styles.categoryHeading} flex justify-start text-sm items-center mb-3 cursor-pointer relative w-full`}
            onMouseEnter={handleCategoryOpen}
            onMouseLeave={handleCategoryClose}
            >
              <ImList size={16} color={"#FF404D"} />
              <span className="ml-4">{language && language === "es" ? "Categorías" : "Categories"}</span>
              {
                isCategoryOpen && (
                  <ul className={`${styles.categoryList}`}>
                  <Link href="/category/banda"><li className={`${styles.categoryItem}`} > Banda </li></Link>
                  <Link href="/category/Metal"><li className={`${styles.categoryItem}`} > Metal </li></Link>
                  <Link href="/category/Reggaetón"><li className={`${styles.categoryItem}`} > Reggaetón </li></Link>
                  <Link href="/category/Rock"><li className={`${styles.categoryItem}`} > Rock </li></Link>
                  <Link href="/category/Bachata"><li className={`${styles.categoryItem}`} > Bachata </li></Link>
                  <Link href="/category/Jazz"><li className={`${styles.categoryItem}`} > Jazz </li></Link>
                  <Link href="/category/Soul"><li className={`${styles.categoryItem}`} > Soul </li></Link>
                  <Link href="/category/Reggae"><li className={`${styles.categoryItem}`} > Reggae </li></Link>
                  <Link href="/category/Ballenato"><li className={`${styles.categoryItem}`} > Ballenato </li></Link>
                  <Link href="/category/Clásico"><li className={`${styles.categoryItem}`} > Clásico </li></Link>
                  <Link href="/category/Salsa "><li className={`${styles.categoryItem}`} > Salsa </li></Link>
                  <Link href="/category/R&B"><li className={`${styles.categoryItem}`} > R&B </li></Link>
                  <Link href="/category/D&B "><li className={`${styles.categoryItem}`} > D&B </li></Link>
                  <Link href="/category/Baladas"><li className={`${styles.categoryItem}`} > Baladas </li></Link>
                  <Link href="/category/Gospel"><li className={`${styles.categoryItem}`} > Gospel </li></Link>
                  <Link href="/category/Merengue"><li className={`${styles.categoryItem}`} > Merengue </li></Link>
                  <Link href="/category/Electrónica"><li className={`${styles.categoryItem}`} > Electrónica </li></Link>
                  <Link href="/category/Rap"><li className={`${styles.categoryItem}`} > Rap </li></Link>
                  <Link href="/category/Rancheras"><li className={`${styles.categoryItem}`} > Rancheras </li></Link>
                  <Link href="/category/Country"><li className={`${styles.categoryItem}`} > Country </li></Link>
                  <Link href="/category/lofi"><li className={`${styles.categoryItem}`} > LOFI </li></Link>
                  <Link href="/category/opera"><li className={`${styles.categoryItem}`} > OPERA </li></Link>
                </ul>
                )
              }

            </div>
            <Link href={"/#artistcarousel"}>
            <div className={`flex justify-start text-sm items-center mb-3 cursor-pointer`}>
              <IoMdStar size={18} color={"#FF404D"} />
              <span className="ml-4 transition hover:text-[#FF404D]">{language && language === "es" ? "Estrellas" : "Star Artists"}</span>
            </div>
            </Link>
          </div>
          {/* <div className="flex flex-col items-start justify-start mb-6">
            <div
              className={`flex justify-start items-center text-lg font-bold mb-3`}
            >
              <span className="uppercase mr-4 text-[#FF404D]">Comunidad</span>
              <IoIosPeople size={18} color={"#FF404D"} />
            </div>
            {/* <div className={`flex justify-start text-sm items-center mb-3`}>
              <span className="cursor-pointer transition hover:text-[#FF404D]">
                English Community
              </span>
            </div>
          </div> */}
          
          {/* <div className="flex flex-col items-start justify-start mb-6">
            <div
              className={`flex justify-start items-center text-lg font-bold mb-3`}
            >
              <span className="uppercase mr-4 text-[#FF404D]">Historial</span>
              <GiBackwardTime size={18} color={"#FF404D"} />
            </div>
            <div className={`flex justify-start text-sm items-center mb-3`}>
              <span className="cursor-pointer transition hover:text-[#FF404D]">
                Some text that I am unable to understand at all
              </span>
            </div>
          </div> */}
          <div className="flex flex-col items-start justify-start mb-6">
            <div
              className={`flex justify-start items-center text-lg font-bold mb-3`}
            >
              <span className="uppercase mr-4 text-[#FF404D]">{language && language === "es" ? "Idiomas" : "Languages"}</span>
              <BsGlobe size={16} color={"#FF404D"} />
            </div>
            <div className={`flex justify-start text-sm items-center mb-3`}>
              <span className="cursor-pointer capitalize transition hover:text-[#FF404D]" onClick={switchToSpanish}>
                español
              </span>
            </div>
            <div className={`flex justify-start text-sm items-center mb-3`}>
              <span className="cursor-pointer capitalize transition hover:text-[#FF404D]" onClick={switchToEnglish}>
                English
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-start justify-start mb-6">
            <div
              className={`flex justify-start items-center text-lg font-bold mb-3`}
            >
              <span className="uppercase mr-4 text-[#FF404D]">{language && language === "es" ? "Redes sociales" : "Social Networks"}</span>
            </div>
            <div className={`flex justify-start text-sm items-center mb-3`}>
              <a href="https://www.facebook.com/nftdemusica/" >
                  <img src='/icons/facebook.png' alt='facebook' className={`sm:w-full w-[70%]`}/>
              </a>
              <a href="https://twitter.com/nftdemusica" >
                  <img src='/icons/twitter.png' alt='facebook' className={`sm:w-full w-[70%]`}/>
              </a>
              <a href="https://discord.gg/egBw4RsC" >
                  <img src='/icons/discord.png' alt='facebook' className={`sm:w-full w-[70%]`}/>
              </a>
              <a href="https://www.instagram.com/nftdemusicaofficial/?r=nametag" >
                  <img src='/icons/instagram.png' alt='facebook' className={`sm:w-full w-[70%]`}/>
              </a>
              <a href="https://www.twitch.tv/nftdemusica" >
                  <img src='/icons/twitch.png' alt='facebook' className={`sm:w-full w-[70%]`}/>
              </a>
              <a href="https://youtube.com/channel/UCmlD2-MSzhXF9a9WJGjOLbQ" >
                  <img src='/icons/youtube.png' alt='facebook' className={`sm:w-full w-[70%]`}/>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
