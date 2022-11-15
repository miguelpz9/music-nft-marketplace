import React, {useEffect, useState} from 'react'
import ArtistSectionMain from '../ArtistSectionMain/ArtistSectionMain'
import SecSidebar from '../SecSidebar/SecSidebar'
import styles from './ArtistSection.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import Active from '../Active/Active'

function ArtistSection(props) {
  const {artist, address} = props;
  const dispatch = useDispatch()
  const artistTab = useSelector(state => state.tabSlice.artistTab)
  const [artistData, setArtistData] = useState();
  const language = useSelector(state => state.walletSlice.language)
  useEffect(() => {
    console.log("LANGUAGE CHANGE TO: ", language);
  }, [language]);
  useEffect(() => {
    // write your function here
  }, [artistTab])
  
  return (
    <div className={`${styles.artistwrapper} w-full relative flex`}>
         <div className={`${styles.artistbig}`}>
          {
            artistTab === 0 && <ArtistSectionMain artist={artist}  currentTab={artistTab} address={address}/>
          }
          {
            artistTab === 1 && <ArtistSectionMain artist={artist} currentTab={artistTab} address={address}/>
          }
          {
            artistTab === 2 && <ArtistSectionMain artist={artist} currentTab={artistTab} address={address}/>
          }
          {
            artistTab === 3 && <ArtistSectionMain artist={artist} currentTab={artistTab} address={address}/>
          }
          {/*
            artistTab === 4 && <Active />
        */}
        </div>
        {/* <div className={`${styles.artistsmall} relative`}>
            <SecSidebar currentTab={artistTab}/>
        </div> */}
    </div>
  )
}

export default ArtistSection