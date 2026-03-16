import express from 'express';
import { getEvents, getEventsByLocation } from '../controllers/events.js';

const router = express.Router();

// All events
router.get('/events', getEvents);

// Events for a specific location
router.get('/events/location/:locationId', getEventsByLocation);

export default router;