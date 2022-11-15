import React, {useEffect, useState} from 'react'
import { topCollections } from '../../../data/data'
import TopColCard from '../TopColCard/TopColCard'
import styles from './TopCollections.module.scss'
import { getCols } from '../../../utils/helpers';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'

function TopCollections() {
    const [isLoading, setIsLoading]  =  useState(true);
    const [noItems, setNoItems]  =  useState(true);
    const [collections, setCollections]  =  useState();
    const language = useSelector(state => state.walletSlice.language)
    useEffect(() => {
      console.log("LANGUAGE CHANGE TO: ", language);
    }, [language]);
    useEffect(() => {
        const loadItems  = async () => {
          setIsLoading(true);
          let collections2 = await getCols();
          console.log(collections2)
          if(collections2 ==  undefined){
            setNoItems(true);
          } else{
            setCollections(collections2);
            setNoItems(false);
          }
          setIsLoading(false);
        }
        loadItems();
      }, []);

      useEffect(() => {
        console.log("COLLECTIONSSSS" , collections);
      }, [noItems]);

  return (
    <div className={`${styles.topcollections} mx-auto flex flex-col justify-start items-center relative`} id="topcollections">
        <h2 className='text-2xl text-center font-bold mb-2'>
            {language === "es" ? "TOP Colecciones" : "TOP Collections"}
        </h2>
        {/* <div className={`${styles.subheader} mb-8 text-2xl font-light text-[#666]`}>
            En los ultimos &nbsp; &nbsp; &nbsp; <span className='font-semibold text-center text-[#fd5356]'>7 DIAS &nbsp; &nbsp; &#x25BC;</span>
        </div> */}
        <div className={`w-full relative flex flex-wrap items-center justify-between`}>
            {
               !noItems && collections ? collections.map((item, index) =>{
                    return (
                        <div
                        key={index} 
                        className={`sm:w-[49%] mb-8 w-[98%]`}
                        >
                            <TopColCard 
                                image={item?.coverImage} 
                                name={item?.name} 
                                lower={item?.volume}
                                upper={item?.floor}
                                symbol={item?.currencyName}
                                amount={item?.totalItems}
                                colId={item.id}
                                id={index+1}
                            />
                        </div>
                    )
                }) : <h3></h3>}
        </div>
    </div>
  )
}

export default TopCollections