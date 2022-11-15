import React, { useState, useEffect } from 'react'
import styles from './artistcarousel.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"
import { getUsers } from '../../../utils/helpers';
import CollectionCard from '../CollectionCard/CollectionCard';

function ArtistCarousel() {
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
        let collections2 = await getUsers();
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
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      const CustomDot = ({ onMove, index, onClick, active }) => {
        // onMove means if dragging or swiping in progress.
        // active is provided by this lib for checking if the item is active or not.
        return (
          <li

            className={active ? "jumbo-active" : "jumbo-passive"}
            onClick={() => onClick()}
          >
          </li>
        );
      };
  return (
    <div className={`${styles.artistcarousel} relative flex justify-center flex-col items-center`} id="artistcarousel">
        <h2 className='text-2xl text-center font-bold'>
            {language && language === "es" ? "Artistas + destacados" : "Premium artists"}
        </h2>
        <div className='w-screen'>
          {!noItems ? <Carousel 
          className='custom-artist-carousel'
          customDot={<CustomDot />}
          showDots
          arrows={false}
          autoPlay={true}
          infinite={true}
          responsive={responsive}>
              {
                !isLoading && collections && collections.map((item, index) =>{
                  return(
                    <CollectionCard key={index} id={index} image={item.media} text={item.name} adr={item.address} />
                  )
                })
              }

          </Carousel>  : <h3 className='text-2xl justify-center top-[20%] absolute left-[50%] h-full text-center font-bold'>{isLoading ? "LOADING..." : ""}</h3>}
        </div>
    </div>
  )
}

export default ArtistCarousel