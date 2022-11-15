import React, {useState} from 'react'
import styles from './TopColBar.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setCollectionTab } from '../../../slices/tabSlice'
import {FaImages,FaPalette} from 'react-icons/fa'
import {AiFillHeart} from 'react-icons/ai'
import {BiCategory} from 'react-icons/bi'
import {MdOutlineStackedLineChart} from 'react-icons/md'
function TopColBar() {
    const dispatch = useDispatch()
    const handleTabChange = (value) => {
        dispatch(setCollectionTab(value))
    }
    let collectionTab = useSelector(state => state.tabSlice.collectionTab)
  return (
    <div className='w-full h-12 flex justify-center relative' style={{borderBottom:'1px solid #ddd'}}>
        <div className={`${collectionTab === 0 ? styles.borderActive : styles.borderInactive} mx-3 cursor-pointer px-4 h-full flex justify-center items-center py-3 pb-6`} onClick={()=>handleTabChange(0)}>
            <BiCategory className={collectionTab === 0 ? styles.iconActive : styles.iconInactive} size={18}/>
            <div className={`${collectionTab === 0 ? styles.tabActive : styles.tabInactive} font-semibold ml-2`}>Items</div>
        </div>
        {/* <div className={`${collectionTab === 1 ? styles.borderActive : styles.borderInactive} mx-3 cursor-pointer px-4 h-full flex justify-center items-center py-3 pb-6`} onClick={()=>handleTabChange(1)}>
            <MdOutlineStackedLineChart className={collectionTab === 1 ? styles.iconActive : styles.iconInactive} size={18}/>
            <div className={`${collectionTab === 1 ? styles.tabActive : styles.tabInactive} font-semibold ml-2`}>Actividad</div>
        </div> */}
    </div>
  )
}

export default TopColBar