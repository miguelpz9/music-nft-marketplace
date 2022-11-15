import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import { BsGlobe } from 'react-icons/bs'
import { FiHome } from 'react-icons/fi'
import { GiBackwardTime } from 'react-icons/gi'
import { ImList } from 'react-icons/im'
import { IoIosPeople, IoMdStar } from 'react-icons/io'
import styles from './AsideMenu.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setLanguage } from "../../../slices/walletSlice";

function Asidemenu() {
  const dispatch = useDispatch()
  const language = useSelector(state => state.walletSlice.language)
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);
    const handleClose = () => {
      console.log('close')
        document.getElementById('asidemenu').classList.add('hidden')
    }
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const switchToEnglish = () => {
      dispatch(setLanguage("en"))
     }
     const switchToSpanish = () => {
      dispatch(setLanguage("es"))
     }
  return (
    <div id='asidemenu' className='fixed top-0 left-0 h-screen w-screen z-20 bg-white p-4 hidden'>
        <div className='w-full flex justify-end text-[30px]' onClick={handleClose}>
            &#10005;
        </div>
        <div className="w-full flex flex-col justify-start relative h-full py-10 px-3 pr-6">
          <div className="flex flex-col items-start justify-start mb-6">
          <div
              className={`flex justify-start items-center text-lg font-bold mb-3`}
            >
              <span className="uppercase mr-4 text-[#FF404D]">{language && language === "es" ? "Principal" : "Main"}</span>
              <FiHome size={18} color={"#FF404D"} />
            </div>
              {/* <Link href={"/#topcollections"}>
            <div className={`flex justify-start text-sm items-center mb-3 cursor-pointer`} onClick={handleClose}>
              <FiHome size={16} color={"#FF404D"} />
              <span className="ml-4 transition hover:text-[#FF404D]">TOP 10 NFT</span>
            </div>
              </Link> */}
            <div className={`${styles.categoryHeading} flex flex-col justify-start text-sm items-start mb-3 cursor-pointer relative w-full`}
            >
              <div className='flex items-center'>
                <ImList size={16} color={"#FF404D"} />
                <span className="ml-4" onClick={()=>setIsCategoryOpen(!isCategoryOpen)}>Categories</span>
              </div>
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
            <Link href={"/comunidad"} >
            <div className={`flex justify-start text-sm items-center mb-3`} onClick={handleClose}>
              <span className="cursor-pointer transition hover:text-[#FF404D]">
                Communidad Latina
              </span>
            </div>
            </Link>
            {/* <div className={`flex justify-start text-sm items-center mb-3`}>
              <span className="cursor-pointer transition hover:text-[#FF404D]">
                English Community
              </span>
            </div> }
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
    </div>
  )
}

export default Asidemenu