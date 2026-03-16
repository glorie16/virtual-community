import express from 'express';
import locations from '../controllers/locations.js';

const router = express.Router();

router.get('/locations', locations.getLocations);

export default router;