import React from 'react'
import styles from './EventsTop.module.scss'

export default function EventsTop () {
  return (
    <div className={`${styles.eventstop} relative`} id="eventstop">
        <div className={`${styles.eventstopCover} w-full h-full text-white flex justify-center items-center flex-col`}>
            <div className={`${styles.homeTitle} uppercase`}>
                crece en el cripto mundo
            </div>
        </div>
    </div>
  )
}
