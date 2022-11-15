import React, { useEffect } from 'react'
import styles from './ArtistHeader.module.scss'

function ArtistHeader(props) {
  const {artist} = props;
  useEffect(() => {
    console.log("123", artist);
  }, []);
  return (
    <div className={`${styles.artistheader} w-full h-[25vh] relative mb-2`}>
        <img src={artist?.coverImage} className='absolute w-full h-full object-cover'/>
        <div className={`${styles.artisthead} flex justify-center items-center`}>
            <img src={artist?.media} className="w-[93%] h-[93%] object-cover" />
        </div>
    </div>
  )
}

export default ArtistHeader