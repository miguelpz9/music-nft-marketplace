import React from 'react'
import styles from './TopCard.module.scss';

function TopCard(props) {
  const { image, name, desc } = props;
  return (
    <div className={`${styles.topcard}`}>
        <img src={image} alt={name} />
        <div className={`${styles.name}`}>
            <span>{name}</span>
        </div>
        <div className={`${styles.view} flex flex-col justify-start items-center`}>
          <div className={`${styles.desc} text-center text-sm mb-4`}>{desc}</div>
          <div className={`${styles.button}`}>
            Ver Galeria
          </div>
        </div>
    </div>
  )
}

export default TopCard