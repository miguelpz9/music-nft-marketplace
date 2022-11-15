import React from 'react'
import EventsList from '../components/EventsList/EventsList'
import EventsTop from '../components/EventsTop/EventsTop'
import styles from './events.module.scss'

function EventsHome() {
  return (
    <div className={`w-full relative flex flex-col`}>
        <EventsTop />
        <EventsList />
    </div>
  )
}

export default EventsHome