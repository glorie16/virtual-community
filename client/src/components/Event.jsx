import React, { useState, useEffect } from 'react';
import '../css/Event.css';

const Event = ({ id, title, date, time, image }) => {
  const [formattedTime, setFormattedTime] = useState('');

  // Format the time to a readable string
  useEffect(() => {
    if (time) {
      const [hours, minutes] = time.split(':'); // assuming "HH:MM:SS"
      const dateObj = new Date();
      dateObj.setHours(Number(hours));
      dateObj.setMinutes(Number(minutes));
      dateObj.setSeconds(0);

      const options = { hour: '2-digit', minute: '2-digit', hour12: true };
      setFormattedTime(dateObj.toLocaleTimeString([], options));
    }
  }, [time]);

  // Format the date nicely without the "Z"
  const formattedDate = date
    ? new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : '';

  return (
    <article className='event-information'>
      {image && <img src={image} alt={title} />}
      <div className='event-information-overlay'>
        <div className='text'>
          <h3>{title}</h3>
          <p>
            <i className="fa-regular fa-calendar fa-bounce"></i> {formattedDate} <br /> {formattedTime}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Event;