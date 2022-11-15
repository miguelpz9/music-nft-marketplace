import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { BiSearch } from 'react-icons/bi'
import styles from './ArtistSectionMain.module.scss'
import Select from 'react-select'
import ItemCards from '../components/ItemCards/ItemCards';
import CollectionCard2 from '../components/CollectionCard2/CollectionCard2';
import CollectionCard from '../components/CollectionCard/CollectionCard';
import { getCategoryNfts, getCollectedByAdress, getCollectionsByAdress } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux'

function Category() {
  const router = useRouter()
  const { params } = router.query
  const [selectedvalue, setSelectedvalue] = useState();
  const [selectedvalue2, setSelectedvalue2] = useState();
  const [isLoading, setIsLoading]  =  useState(true);
  const [noItems, setNoItems]  =  useState(true);
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
      const loadSearch  = async () => {
        console.log("OWNED", params);
        setIsLoading(true);
        let items = await getCategoryNfts(params);
        if(items  ==  0){
          setNoItems(true);
        } else{
          setOwnedItems(items);
          setNoItems(false);
        }
        console.log("AFAAWW", items);
        setIsLoading(false);
      }
      loadSearch();
    }, [params])
    

  return (
    <div className={`sm:w-[90%] w-full min-h-[70vh] py-6 px-4 ml-auto relative`}>
        {/*<div className='mb-5 font-semibold text-[12px]'>
            {ownedItems?.singlesByCategory.length} NFTS por categoría
        </div>
        {!noItems ? <div className='flex justify-start sm:gap-[2%] gap-[4%] flex-wrap'>
            {
              !isLoading && ownedItems.singlesByCategory && ownedItems.singlesByCategory.map((item, index) =>{
                return(
                  <div className={`sm:w-[23%] w-[46%] mb-4`}>
                    <ItemCards id={item.id} item={item}/>
                  </div>
                )
              })
            }
            
           
        </div>  : <h3 className='text-2xl justify-center top-[20%] absolute left-[50%] h-full text-center font-bold'>{isLoading ? "LOADING..." : "NO ITEMS"}</h3>}
        */}
        <div className='mb-5 font-semibold text-[12px]'>
            {ownedItems?.length} {language && language === "es" ? "NFTS por categoría" : "NFTS by category"}
        </div>
        {!noItems ? <div className='flex justify-start sm:gap-[2%] gap-[4%] flex-wrap'>
            {
              !isLoading && ownedItems && ownedItems.map((item, index) =>{
                return(
                  <div key={index} className={`sm:w-[23%] w-[46%] mb-4`}>
                    <ItemCards id={item.id} item={item}/>
                  </div>
                )
              })
            }
            
           
        </div>  : <h3 className='text-2xl justify-center top-[20%] absolute left-[50%] h-full text-center font-bold'>{isLoading ? "LOADING..." : "NO ITEMS"}</h3>}
    </div>
  )
}

export default Category