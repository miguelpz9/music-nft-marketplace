import React from 'react'
import styles from './CustomFooter.module.scss'

export default function CustomFooter () {
  return (
    <div className={`${styles.customfooter} flex justify-between w-screen fixed z-10 bg-gray-900 h-8 bottom-0 left-0`}>
        <div className={`${styles.childcontent}`}>
            Cripto Artes
        </div>
        <div className={`${styles.childcontent}`}>
            Muzi Wallet
        </div>
        <div className={`${styles.childcontent}`}>
            Nft With Music
        </div>
    </div>
  )
}
