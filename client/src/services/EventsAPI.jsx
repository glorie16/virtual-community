// client/src/services/EventsAPI.jsx
const API_URL = 'http://localhost:3000';

// Get all events
const getEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/events`);
    if (!response.ok) throw new Error('Failed to fetch events');
    const data = await response.json();
    return data; // returns an array of event objects
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

// Get events for a specific location
const getEventsByLocationId = async (locationId) => {
  try {
    const response = await fetch(`${API_URL}/events/location/${locationId}`);
    if (!response.ok) throw new Error(`Failed to fetch events for location ${locationId}`);
    const data = await response.json();
    return data; // returns an array of events for that location
  } catch (error) {
    console.error(`Error fetching events for location ${locationId}:`, error);
    return [];
  }
};

// Get a single event by ID
const getEventById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/events/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch event ${id}`);
    const data = await response.json();
    return data; // returns a single event object
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    return null;
  }
};

export default {
  getEvents,
  getEventsByLocationId,
  getEventById,
};