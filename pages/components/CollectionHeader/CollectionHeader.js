import React from 'react'
import styles from './CollectionHeader.module.scss'

function CollectionHeader(props) {
  const {pfp, cover} = props;
  return (
    <div className={`${styles.collectionheader} w-full h-[25vh] relative mb-2`}>
        <img src={cover} className='absolute w-full h-full object-cover'/>
        <div className={`${styles.collectionhead} flex justify-center items-center`}>
            <img src={pfp} className="w-[93%] h-[93%] object-cover" />
        </div>
    </div>
  )
}

export default CollectionHeader