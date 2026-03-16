// client/src/services/LocationsAPI.jsx
const API_URL = 'http://localhost:3000'; // adjust if your backend runs on another port

// Get all locations
const getLocations = async () => {
  try {
    const response = await fetch(`${API_URL}/locations`);
    if (!response.ok) throw new Error('Failed to fetch locations');
    const data = await response.json();
    return data; // returns an array of location objects
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};

// Get single location by ID
const getLocationById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/locations/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch location with id ${id}`);
    const data = await response.json();
    return data; // returns a single location object
  } catch (error) {
    console.error(`Error fetching location ${id}:`, error);
    return null;
  }
};

export default {
  getLocations,
  getLocationById,
};