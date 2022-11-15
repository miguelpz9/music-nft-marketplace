import React, {useState, useEffect} from 'react'
import styles from './TopBarArtist.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setArtistTab } from '../../../slices/tabSlice'
import {FaImages,FaPalette} from 'react-icons/fa'
import {AiFillHeart} from 'react-icons/ai'
import {BiCategory} from 'react-icons/bi'
import {MdOutlineStackedLineChart} from 'react-icons/md'
function TopBarArtist() {
    const dispatch = useDispatch()
    const handleTabChange = (value) => {
        dispatch(setArtistTab(value))
    }
    const language = useSelector(state => state.walletSlice.language)
    useEffect(() => {
      console.log("LANGUAGE CHANGE TO: ", language);
    }, [language]);
    let artistTab = useSelector(state => state.tabSlice.artistTab)
  return (
    <div className='w-full h-12 flex max-w-[100%] overflow-y-scroll justify-center relative' style={{borderBottom:'1px solid #ddd'}}>
        <div className={`${artistTab === 0 ? styles.borderActive : styles.borderInactive} mx-3 cursor-pointer px-4 h-full flex justify-center items-center py-3 pb-6`} onClick={()=>handleTabChange(0)}>
            <FaImages className={artistTab === 0 ? styles.iconActive : styles.iconInactive} size={18}/>
            <div className={`${artistTab === 0 ? styles.tabActive : styles.tabInactive} font-semibold ml-2`}>{language && language === "es" ? "Coleccionados" : "Collected"}</div>
        </div>
        <div className={`${artistTab === 1 ? styles.borderActive : styles.borderInactive} mx-3 cursor-pointer px-4 h-full flex justify-center items-center py-3 pb-6`} onClick={()=>handleTabChange(1)}>
            <FaPalette className={artistTab === 1 ? styles.iconActive : styles.iconInactive} size={18}/>
            <div className={`${artistTab === 1 ? styles.tabActive : styles.tabInactive} font-semibold ml-2`}>{language && language === "es" ? "Sencillos" : "Singles"}</div>
        </div>
        <div className={`${artistTab === 2 ? styles.borderActive : styles.borderInactive} mx-3 cursor-pointer px-4 h-full flex justify-center items-center py-3 pb-6`} onClick={()=>handleTabChange(2)}>
            <AiFillHeart className={artistTab === 2 ? styles.iconActive : styles.iconInactive} size={18}/>
            <div className={`${artistTab === 2 ? styles.tabActive : styles.tabInactive} font-semibold ml-2`}>{language && language === "es" ? "Favoritos" : "Favourites"}</div>
        </div>
        <div className={`${artistTab === 3 ? styles.borderActive : styles.borderInactive} mx-3 cursor-pointer px-4 h-full flex justify-center items-center py-3 pb-6`} onClick={()=>handleTabChange(3)}>
            <BiCategory className={artistTab === 3 ? styles.iconActive : styles.iconInactive} size={18}/>
            <div className={`${artistTab === 3 ? styles.tabActive : styles.tabInactive} font-semibold ml-2`}>{language && language === "es" ? "Colecciones" : "Collections"}</div>
        </div>
        {/* <div className={`${artistTab === 4 ? styles.borderActive : styles.borderInactive} mx-3 cursor-pointer px-4 h-full flex justify-center items-center py-3 pb-6`} onClick={()=>handleTabChange(4)}>
            <MdOutlineStackedLineChart className={artistTab === 4 ? styles.iconActive : styles.iconInactive} size={18}/>
            <div className={`${artistTab === 4 ? styles.tabActive : styles.tabInactive} font-semibold ml-2`}>Actividad</div>
        </div> */}
    </div>
  )
}

export default TopBarArtist