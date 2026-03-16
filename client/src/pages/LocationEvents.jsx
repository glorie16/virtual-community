import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'

const LocationEvents = ({ index }) => {
    const [location, setLocation] = useState(null) // start with null
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchLocationAndEvents = async () => {
            try {
                // Fetch the location info
                const locationData = await LocationsAPI.getLocationById(index)
                setLocation(locationData)

                // Fetch events for this location
                const eventsData = await EventsAPI.getEventsByLocationId(index)
                setEvents(eventsData)
            } catch (error) {
                console.error('Error fetching location or events:', error)
            }
        }

        fetchLocationAndEvents()
    }, [index])

    if (!location) return <p>Loading location...</p>

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} alt={location.name} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {events.length > 0 ? (
                    events.map((event) => (
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ))
                ) : (
                    <h2>
                        <i className="fa-regular fa-calendar-xmark fa-shake"></i>{' '}
                        No events scheduled at this location yet!
                    </h2>
                )}
            </main>
        </div>
    )
}

export default LocationEvents