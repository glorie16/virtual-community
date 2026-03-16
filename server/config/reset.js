import 'dotenv/config'; // loads your .env
import { pool } from './database.js';

// Sample data
const locationsData = [
  {
    name: 'Echo Lounge',
    address: '123 Main St',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    image: 'https://example.com/echo.jpg'
  },
  {
    name: 'House of Blues',
    address: '456 Broadway',
    city: 'Portland',
    state: 'OR',
    zip: '97205',
    image: 'https://example.com/blues.jpg'
  },
  {
    name: 'Pavilion',
    address: '789 Center Rd',
    city: 'Portland',
    state: 'OR',
    zip: '97209',
    image: 'https://example.com/pavilion.jpg'
  },
  {
    name: 'American Airlines Arena',
    address: '101 Arena Ave',
    city: 'Portland',
    state: 'OR',
    zip: '97212',
    image: 'https://example.com/aaarena.jpg'
  }
];

const eventsData = [
  {
    title: 'Jazz Night',
    description: 'Live jazz performances',
    event_date: '2026-03-20',
    event_time: '19:00',
    location_id: 1,
    image: 'https://example.com/jazz.jpg'
  },
  {
    title: 'Rock Concert',
    description: 'Rock band playing hits',
    event_date: '2026-03-22',
    event_time: '20:30',
    location_id: 2,
    image: 'https://example.com/rock.jpg'
  },
  {
    title: 'Food Festival',
    description: 'Taste local cuisine',
    event_date: '2026-03-25',
    event_time: '12:00',
    location_id: 3,
    image: 'https://example.com/food.jpg'
  },
  {
    title: 'Sports Event',
    description: 'Basketball game',
    event_date: '2026-03-28',
    event_time: '18:00',
    location_id: 4,
    image: 'https://example.com/sports.jpg'
  }
];

// Create tables
const createTables = async () => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS events;
      DROP TABLE IF EXISTS locations;

      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        address TEXT,
        city VARCHAR(50),
        state VARCHAR(50),
        zip VARCHAR(20),
        image TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        event_date DATE,
        event_time TIME,
        location_id INTEGER REFERENCES locations(id),
        image TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('🎉 Tables created successfully!');
  } catch (err) {
    console.error('⚠️ Error creating tables', err);
  }
};

// Insert sample data
const seedTables = async () => {
  try {
    await createTables();

    // Insert locations
    for (const loc of locationsData) {
      await pool.query(
        'INSERT INTO locations (name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6)',
        [loc.name, loc.address, loc.city, loc.state, loc.zip, loc.image]
      );
      console.log(`✅ ${loc.name} added successfully`);
    }

    // Insert events
    for (const ev of eventsData) {
      await pool.query(
        'INSERT INTO events (title, description, event_date, event_time, location_id, image) VALUES ($1, $2, $3, $4, $5, $6)',
        [ev.title, ev.description, ev.event_date, ev.event_time, ev.location_id, ev.image]
      );
      console.log(`✅ ${ev.title} added successfully`);
    }

    console.log('🎉 All sample data inserted!');
  } catch (err) {
    console.error('⚠️ Error inserting data', err);
  } finally {
    pool.end();
  }
};

seedTables();