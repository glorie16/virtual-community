// src/pages/Events.jsx
import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import Event from '../components/Event'


const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventsAPI.getEvents()
        setEvents(data)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) return <p>Loading events...</p>

  return (
    <div className='all-events-page'>
      <h1>All Events</h1>

      {events.length > 0 ? (
        <div className='events-grid'>
          {events.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.event_date}
              time={event.event_time}
              image={event.image}
            />
          ))}
        </div>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  )
}

export default Events