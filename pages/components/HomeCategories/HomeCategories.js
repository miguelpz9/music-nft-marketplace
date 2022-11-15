import React, { useState, useEffect } from 'react'
import styles from './artistcarousel.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import Carousel from "react-multi-carousel";
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi'
import "react-multi-carousel/lib/styles.css"
import { getPremiumUsers } from '../../../utils/helpers';
import CollectionCard from '../CollectionCard/CollectionCard';
import { setSearch } from "../../../slices/walletSlice";

function HomeCategories() {
  const language = useSelector(state => state.walletSlice.language)
  const dispatch = useDispatch()
    // const [searchText, setSearchText] = useState("");
  const searchText = useSelector(state => state.walletSlice.search)
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);
  
  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value))
  }

  return (
    <div className={`${styles.artistcarousel} relative -mt-36 flex justify-center flex-col items-center`} id="artistcarousel">
        <h2 className='text-2xl text-center font-bold'>
            {language && language === "es" ? "Busca tu categoría" : "Search your category"}
        </h2>
        <div className={`${styles.searchbar} relative`}>
          <input type="text" value={searchText} placeholder={language && language === "es" ? "Buscar" : "Search"} onChange={handleSearchChange}/>
          <div className="absolute right-2" style={{ top: "17.5%" }}>
            <BiSearch size={22} color={"#f00"} />
          </div>
        </div>
        <div className='w-screen'>
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
        </div>
    </div>
  )
}

export default HomeCategories