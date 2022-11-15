import React, {useState, useEffect} from 'react'
import styles from './Individual.module.scss'
import { useRouter } from 'next/router'
import {
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { addOwnerToCollections, getSingles } from "../../utils/helpers";
import { nusicAddress, nusicABI } from "../../smartContract";
import {
  nusicMarketPlaceABI,
  nusicMarketPlaceAddress,
} from "../../smartContract/NusicMarketPlaceABI&Address";
import Loader from "../components/Loader";
import IndDetails from '../components/IndDetails/IndDetails'
import IndDisplay from '../components/IndDisplay/IndDisplay'
import { useSelector, useDispatch } from 'react-redux'

function Individual({ data }) {
  const router = useRouter()
  const { id } = router.query
  const [isLoading, setIsLoading]  =  useState(true);
  const [noItems, setNoItems]  =  useState(true);
  const [collections, setCollections]  =  useState(data);
  const language = useSelector(state => state.walletSlice.language)
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);
    // useEffect(() => {
    //   const loadItems  = async () => {
    //     setIsLoading(true);
    //     let collections2 = await getSingles(id);
    //     console.log("saa", collections2);
    //     if(collections2  ==  0){
    //       setNoItems(true);
    //     } else{
    //       setCollections(collections2);
    //       setNoItems(false);
    //     }
    //     console.log("USAGFUI", collections2);
    //     setIsLoading(false);
    //   }
    //   loadItems();
    // }, [id]);
  return (
    <div className={`${styles.individual} min-h-screen sm:w-[83%] w-[95%] mx-auto py-6 flex sm:flex-row flex-col relative`}>
        <div className={`sm:w-[60%] w-full sm:h-full relative sm:mb-0 mb-4`}>
          {collections && <IndDisplay data={collections} />}
        </div>
        <div className={`sm:w-[40%] w-full h-full relative`}>
          {collections &&<IndDetails data={collections} />}
        </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  return { props: { data: await getSingles(ctx.query.id) } };
};

export default Individual