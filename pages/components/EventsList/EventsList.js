import React from 'react'
import HomeEvents from '../HomeEvents/HomeEvents'
import styles from './EventsList.module.scss'

function EventsList() {
  return (
    <div className={`sm:w-[83%] w-[95%] flex relative flex-col mx-auto min-h-[100vh] py-7`}>
        <div className='mb-12'>
            <span className='text-2xl font-semibold text-[#999]'>Categorias:</span>
            <span className='mx-3 text-xs sm:text-base'>Musica</span>
            <span className='mx-3 text-xs sm:text-base'>Eventos</span>
            <span className='mx-3 text-xs sm:text-base'>NFT</span>
            <span className='mx-3 text-xs sm:text-base'>Noticias</span>
        </div>
        <div className='min-h-[80vh] h-auto'>
            <HomeEvents customWidth={'w-full'} />
        </div>
    </div>
  )
}

export default EventsList