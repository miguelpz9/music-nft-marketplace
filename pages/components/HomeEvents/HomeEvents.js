import React,  {useEffect, useState} from 'react'
import { events } from '../../../data/data'
import HomeEventCard from '../HomeEventCard/HomeEventCard'
import styles from './HomeEvents.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { getNews } from '../../../utils/helpers';

function HomeEvents(props) {
    const [isLoading, setIsLoading]  =  useState(true);
    const [noItems, setNoItems]  =  useState(true);
    const [collections, setCollections]  =  useState();
    const { data, customWidth } = props
    const language = useSelector(state => state.walletSlice.language)
    useEffect(() => {
      console.log("LANGUAGE CHANGE TO: ", language);
    }, [language]);
    useEffect(() => {
        const loadItems  = async () => {
          setIsLoading(true);
          let collections2 = await getNews();
          console.log("NEWS",  collections2)
          if(collections2  ==  0){
            setNoItems(true);
          } else{
            setCollections(collections2);
            setNoItems(false);
          }
          console.log(collections);
          setIsLoading(false);
        }
        loadItems();
      }, []);
  return (
    <div className={`${styles.homeevents} ${customWidth ? customWidth : 'sm:sm:w-[83%] w-[95%] w-[95%]'} mx-auto flex flex-col justify-start items-center relative`}>
        <h2 className='text-2xl text-center font-bold mb-8'>
            <span className='text-[#fd5356]'>{language === "es" ? "Últimas noticias" : "Latest News"}</span>
        </h2>
        {!noItems ? <div className='w-full flex sm:flex-row flex-col justify-start gap-[1%] items-center flex-wrap'>
            {
                collections && collections.map((item, index) =>{
                    return (
                        <div className={`relative ${styles.eventcard} mb-3`} key={index}>
                            <HomeEventCard 
                                image={item.image}
                                name={item.name}
                                desc={item.description}
                                date={item.date}
                            />
                        </div>
                    )
                })
            }
        </div> : <h3>NO ITEMS</h3>}
    </div>
  )
}

export default HomeEvents