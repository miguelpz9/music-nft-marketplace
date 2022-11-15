import React, {useState, useEffect} from 'react'
import { BiSearch } from 'react-icons/bi'
import styles from './ArtistSectionMain.module.scss'
import Select from 'react-select'
import ItemCards from '../ItemCards/ItemCards';
import {useSelector, useDispatch} from 'react-redux'
import CollectionCard2 from '../CollectionCard2/CollectionCard2';
import { getSinglesByAdress, getCollectedByAdress, getCollectionsByAdress } from '../../../utils/helpers';
import {fetchOwnedItems, fetchFavouriteItems, fetchArtistSingles, fetchArtistCollections} from '../../../helpers/fetchers';
import axios from 'axios';
import Artist from '../../user/[aid]';

function ArtistSectionMain(props) {
  const [selectedvalue, setSelectedvalue] = useState();
  const [selectedvalue2, setSelectedvalue2] = useState();
  const [isLoading, setIsLoading]  =  useState(true);
  const [noItems, setNoItems]  =  useState(true);
  const {currentTab} = props
  const {artist, address} = props;
  const [ownedItems, setOwnedItems]  =  useState();
  const language = useSelector(state => state.walletSlice.language)
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          border:'1px solid #111',
          height: "40px",
          borderRadius:'5px',
          width:'100%',
        }),
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? 'white' : 'black',
          backgroundColor: state.isSelected ? 'navy' : 'white',
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,
          color: 'black',
        }),
        indicatorSeparator: (provided, state) => ({
          ...provided,
          display: 'none',
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        }
      }
    const options = [
    {
        label: "Dolar Estadounidense (USD)",
        value: "Todos",
    },
    {
        label: "Binance Smart Coin (BNB)",
        value: "Favoritos",
    },
    ];
    useEffect(() => {
      const loadOwned  = async () => {
        console.log("OWNED", artist.address);
        setIsLoading(true);
        let items = await getCollectedByAdress(address);
        if(items  ==  0){
          setNoItems(true);
        } else{
          setOwnedItems(items);
          setNoItems(false);
        }
        console.log("AFAAWW", items);
        setIsLoading(false);
      }
      const loadFavourite  = async () => {
        console.log("FAV", artist);
        setIsLoading(true);
        let items = await fetchFavouriteItems(artist?.address);
        if(items  ==  0){
          setNoItems(true);
        } else{
          setOwnedItems(items);
          setNoItems(false);
        }
        console.log("AFAAWW", items);
        setIsLoading(false);
      }
      const loadCreated  = async () => {
        console.log("CREATED", artist);
        setIsLoading(true);
        let items = await getSinglesByAdress(address);
        if(items  ==  0){
          setNoItems(true);
        } else{
          setOwnedItems(items);
          setNoItems(false);
        }
        console.log("AFAAWW", items);
        setIsLoading(false);
      }
      const loadCollections  = async () => {
        console.log("COLLEDCTIONS", artist);
        setIsLoading(true);
        let items = await getCollectionsByAdress(address);
        if(items  ==  0){
          setNoItems(true);
        } else{
          setOwnedItems(items);
          setNoItems(false);
        }
        console.log("COLLEDCTIONS", items);
        setIsLoading(false);
      }
      if(currentTab == 0){
        loadOwned();
      } else if(currentTab == 1){
        loadCreated();
      } else if(currentTab == 2){
        loadFavourite();
      }else if(currentTab == 3){
        loadCollections();
      }
    }, [currentTab, artist, address])
    

  return (
    <div className={`sm:w-[90%] w-full min-h-[70vh] py-6 px-4 ml-auto relative`}>
        {/* <div className={`flex w-full gap-3 mb-3 flex-wrap`}>
            <div className={`${styles.artistsearch} sm:w-[30%] mb-0 sm:mb-8 w-full relative flex`}>
                <input type={"text"} placeholder="Buscar"/>
                <span className='absolute right-2 top-2 cursor-pointer'>
                    <BiSearch size={22}/>
                </span>
            </div>
            <div className={`sm:w-[25%] w-[48%] relative`}>
                <Select
                options={options}
                className="w-full"
                styles={customStyles}
                value={selectedvalue}
                onChange={(selectedvalue) => setSelectedvalue(selectedvalue)}
                placeholder="Seleccionar"
                getOptionLabel={(e) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginLeft: 5, fontSize: 12 }}>{e.label}</span>
                    </div>
                  )}
                />
            </div>
            <div className={`sm:w-[25%] w-[48%] relative`}>
                <Select
                options={options}
                className="w-full"
                styles={customStyles}
                value={selectedvalue2}
                onChange={(selectedvalue) => setSelectedvalue2(selectedvalue)}
                placeholder="Seleccionar"
                getOptionLabel={(e) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginLeft: 5, fontSize: 12 }}>{e.label}</span>
                    </div>
                  )}
                />
            </div>
        </div> */}
        <div className='mb-5 font-semibold text-[12px]'>
            {ownedItems?.length} Items
        </div>
        {!noItems ? <div className='flex justify-start sm:gap-[2%] gap-[4%] flex-wrap'>
            {
              !isLoading && ownedItems && ownedItems.map((item, index) =>{
                return(
                  <div key={index} className={`sm:w-[23%] w-[46%] mb-4`}>
                    {currentTab !== 3 ? <ItemCards id={item.id} item={item}/> : <CollectionCard2 id={item.id} item={item} image={item.coverImage} text={item.name} adr={item.id}/>}
                  </div>
                )
              })
            }
        </div>  : <h3 className='text-2xl justify-center top-[20%] absolute left-[50%] h-full text-center font-bold'>{isLoading ? "LOADING..." : "NO ITEMS"}</h3>}
        
    </div>
  )
}

export default ArtistSectionMain