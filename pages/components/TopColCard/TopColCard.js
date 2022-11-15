import React from 'react'
import styles from './TopColCard.module.scss'
import { FaEthereum } from 'react-icons/fa'
import Link from 'next/link'

function TopColCard(props) {
    const { image, name, lower, upper, symbol, amount, id, colId } = props
  return (
    <Link href={`/collection/${colId}`}>
    <div className={`${styles.topcolcard} w-full flex relative px-2 sm:px-8 py-3`}>
        <div className={`${styles.image} relative`}>
            <img src={image} alt={name} />
        </div>
        <div className={`${styles.details}`}>
            <div className='mb-2'>
                <h3 className={`${styles.name} text-xl uppercase font-semibold text-[#fff]`}>#{id} &nbsp;<span className='text-[#FF404D]'>{name}</span></h3>
            </div>
            <div className='flex justify-between items-start'>
                <div>
                    <div className={`${styles.upper} sm:text-xs text-[9px] font-medium mb-1`}>Cantidad de NFT</div>
                    <div className={`${styles.lower} sm:text-xs text-[8px] font-light text-white`}>
                        {amount} en coleccion
                    </div>
                </div>
                <div>
                    <div className={`${styles.upper} sm:text-xs text-[9px] font-medium mb-1`}>Volumen</div>
                    <div className={`${styles.lower} sm:text-xs text-[8px] font-light text-white flex items-center`}>
                        {lower} {symbol}
                    </div>
                </div>
                <div>
                    <div className={`${styles.upper} sm:text-xs text-[9px] font-medium mb-1`}>Precio mínimo</div>
                    <div className={`${styles.lower} sm:text-xs text-[8px] font-light text-white flex items-center`}>
                        {upper} {symbol}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default TopColCard;