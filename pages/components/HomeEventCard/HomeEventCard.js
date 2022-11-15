import React from 'react'
import styles from './HomeEventCard.module.scss'
import moment from 'moment';

function HomeEventCard(props) {
    const { image, name, desc, id, date } = props;
  const descFormatter = (d) => {
    return d.substring(0, 70) + '...';
  }
  const dateFormatter = (d) =>{
      let d1 = moment(new Date())
      let d2 = moment(new Date(d))
      return d1.diff(d2, 'days')
  }
  return (
    <div className={`${styles.homeeventcard} w-full p-2 relative cursor-pointer`}>
        <div className='relative w-full h-[60%] bg-black rounded-[10px] overflow-hidden'>
            <img src={image} alt={name} className='h-full w-full object-cover'/>
        </div>
        <div className='h-[40%] pt-3 flex flex-col'>
            <div className='font-semibold text-sm mb-2'>{name}</div>
            <div className='text-[10px] text-[#777] mb-2'>{desc}</div>
            <hr className='mt-auto'/>
            <div className='text-[10px] text-[#aaa] flex justify-between items-center pt-2'>Hace {date && dateFormatter(date)} dia</div>
        </div>
    </div>
  )
}

export default HomeEventCard