import React, {useEffect, useState} from 'react'
import CollectionSectionMain from '../CollectionSectionMain/CollectionSectionMain'
import SecSidebar from '../SecSidebar/SecSidebar'
import styles from './CollectionSection.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import Active from '../Active/Active'
import { getSinglesByCollection, getCollectedByAdress, getCollectionsByAdress } from '../../../utils/helpers';

function CollectionSection(props) {
  const {cid} = props;
  const dispatch = useDispatch()
  const collectionTab = useSelector(state => state.tabSlice.collectionTab)
  const [artistData, setArtistData] = useState();
  const [ownedItems, setOwnedItems]  =  useState();
  const [isLoading, setIsLoading]  =  useState(true);
  const [noItems, setNoItems]  =  useState(true);
  
  return (
    <div className={`${styles.collectionwrapper} w-full relative flex`}>
        <div className={`${styles.collectionbig} w-full`}>
          {
            collectionTab === 0 && <CollectionSectionMain currentTab={collectionTab} cid={cid} />
          }
          {
            collectionTab === 1 && <Active />
          }
        </div>
        {/* <div className={`${styles.collectionsmall} relative`}>
            <SecSidebar currentTab={collectionTab}/>
        </div> */}
    </div>
  )
}

export default CollectionSection