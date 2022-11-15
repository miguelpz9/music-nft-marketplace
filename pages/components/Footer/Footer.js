import React from 'react'
import styles from './Footer.module.scss';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'
import { setLanguage } from "../../../slices/walletSlice";

function Footer() {
    const dispatch = useDispatch()
    const language = useSelector(state => state.walletSlice.language)
    const switchToEnglish = () => {
        dispatch(setLanguage("en"))
    }
    const switchToSpanish = () => {
     dispatch(setLanguage("es"))
    }

  return (
    <div className={`${styles.footer} w-full flex flex-col items-center justify-between relative`}>
        <div className={`sm:w-[50%] w-[95%] relative`}>
            <img src='/icons/fatlogo.png' alt='logo' className={`w-full`}/>
        </div>
        <div className={`${styles.social} sm:w-[50%] w-[95%] relative flex justify-between items-center`}>
            <span className={`relative w-[30%] sm:text-base text-[12px] text-white font-bold`}>
                {language === "es" ? "Forma parte de nuestra" : "Form part of our"} <br />
                {language === "es" ? "comunidad en las redes" : "community in social networks"}
            </span>
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
        <div className={`${styles.links} py-3 flex sm:justify-around justify-between sm:w-[50%] w-[95%] items-start`}>
            <div className='flex flex-col items-center justify-center'>
                <h3 className='mb-2 text-lg'>{language === "es" ? "Accesos"  : "Access"}</h3>
                <Link href="/#helpcenter"><a className='mb-2 text-sm cursor-pointer text-[#aaa] hover:text-[#ff0000]'>{language === "es" ? "Centro de ayuda" : "Help Center"}</a></Link>
                <Link href="/#subscribe"><a className='mb-2 text-sm cursor-pointer text-[#aaa] hover:text-[#ff0000]'>{language === "es" ? "Suscríbete" : "Subscribe"}</a></Link>
                <Link href="/premium">
                    <div className='mb-2 text-sm font-semibold cursor-pointer text-[#c94e4e] hover:text-[#ff0000]'>{language === "es" ? "Hazte Premium" : "Become Premium"}</div>
                </Link>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <h3 className='mb-2 text-lg'>{language === "es" ? "Seguridad" : "Security"}</h3>
                <Link href="/terms"><div className='mb-2 text-sm cursor-pointer text-[#aaa] hover:text-[#ff0000]'>{language === "es" ? "Términos y Condiciones" : "Terms and conditions"}</div></Link>
                <Link href="/privacy"><div className='mb-2 text-sm cursor-pointer text-[#aaa] hover:text-[#ff0000]'>{language === "es" ? "Políticas de privacidad" : "Privacy Policies"}</div></Link>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <h3 className='mb-2 text-lg'>{language === "es" ? "Lenguaje" : "Language"}</h3>
                <div className='mb-2 text-sm cursor-pointer text-[#aaa] hover:text-[#ff0000]' onClick={switchToSpanish} >Español</div>
                <div className='mb-2 text-sm cursor-pointer text-[#aaa] hover:text-[#ff0000]' onClick={switchToEnglish} >English</div>
            </div>
        </div>
        <div className='py-1 text-xs font-light text-[#aaa]'>
            NFT de Musica ©. Todos los derechos reservados.
        </div>
    </div>
  )
}

export default Footer