import { pool } from '../config/database.js';

export const getEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getEventsByLocation = async (req, res) => {
  const locationId = req.params.locationId;
  try {
    const result = await pool.query(
      'SELECT * FROM events WHERE location_id = $1 ORDER BY event_date, event_time',
      [locationId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching events for location:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};