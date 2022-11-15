import React from 'react'
import styles from './TopDrops.module.scss';
import TopCard from '../TopCard/TopCard';
import { artistDrops } from '../../../data/data';

function TopDrops() {
  return (
    <div className={`${styles.topdrops} mx-auto flex flex-col justify-center items-center relative`}>
        <h2 className='text-2xl text-center font-bold mb-8'>
            Los 3 ArtistDrop <span className='text-[#f00]'>+ Destacados</span>
        </h2>
        <div className='w-full flex justify-between items-center flex-wrap sm:mb-0 mb-4'>
            {
                artistDrops && artistDrops.map((item, index) =>{
                    return (
                        <TopCard key={index} image={item.image} name={item.name} desc={item.description} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default TopDrops