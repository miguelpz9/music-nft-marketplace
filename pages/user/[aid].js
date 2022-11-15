import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ArtistHeader from '../components/ArtistHeader/ArtistHeader'
import ArtistSub from '../components/ArtistSub/ArtistSub'
import TopBarArtist from '../components/TopBarArtist/TopBarArtist'
import ArtistSection from '../components/ArtistSection/ArtistSection'
import { getOrCreateUser, getUser } from '../../utils/helpers';
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useSelector, useDispatch } from 'react-redux'
const defaultDetails = {
  address: "0x0000000000000000000000000000000000000000",
  coverImage: "https://firebasestorage.googleapis.com/v0/b/nftdemusica33.appspot.com/o/white1-1138683420.png?alt=media&token=c9aee213-f4ff-4831-8f59-7cd7c044da98",
  description: "It seems that this account has no description yet",
  isInitialised: false, 
  isPremium: false,
  media: "https://firebasestorage.googleapis.com/v0/b/nftdemusica33.appspot.com/o/202-2026524_person-icon-default-user-icon-png-4065902066.png?alt=media&token=32843407-b108-4d0d-b262-ffb841ac0a04", 
  name: "0x0000000000000000000000000000000000000000",
  social: "",
}
function Artist() {
  const router = useRouter()
  const { aid } = router.query
  const [isLoading, setIsLoading]  =  useState(true);
  const [noItems, setNoItems]  =  useState(true);
  const [collections, setCollections]  =  useState(defaultDetails);
  const language = useSelector(state => state.walletSlice.language)
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);

    useEffect(() => {
      const loadItems  = async () => {
        setIsLoading(true);
        let collections2 = await getUser(aid);
        console.log("saa", collections2);
        if(collections2  ==  0){
          setNoItems(false);
          setCollections(defaultDetails);
          collections.name = aid;
          collections.address = aid;
          console.log("FFRF", collections);
        } else{
          setCollections(collections2);
          setNoItems(false);
        }
        console.log("USAGFUI", collections2);
        setIsLoading(false);
      }
      loadItems();
    }, [aid]);
    useEffect(() => {
      console.log("TEST", aid);
    }, [aid]);

  return (
    <div className='w-full h-full'>
        { collections && <ArtistHeader artist={collections}/>}
        { collections && <ArtistSub artist={collections} address={collections?.address} />}
        <TopBarArtist />
        { collections && <ArtistSection artist={collections} address={collections?.address} />}
    </div>
  )
}

// export const getServerSideProps = async (ctx) => {
//   const { address } = ctx.query;
//   console.log(address);
//   let data = await getOrCreateUser(address);
//   console.log(data);
//   return { props: { data, address } };
// };

export default Artist