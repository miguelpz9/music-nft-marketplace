import React from 'react'
import styles from './CollectionCard.module.scss';
import Link from 'next/link';

function CollectionCard2(props) {
    const { image, text, adr, id, artist } = props;
  return (
    <Link href={`/collection/${adr}`} >
      <div className={`${styles.collectioncard} relative overflow-hidden`}>
          <img src={image} alt='collection' className={`${styles.collectioncard__image}`} />
          <div className={`${styles.collectioncard__text}`}>
              <h3 className={`${styles.collectioncard__text__title}`}>{text}</h3>
          </div>
      </div>
    </Link>
  )
}

export default CollectionCard2