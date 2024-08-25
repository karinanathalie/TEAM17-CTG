import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface EventDropdownProps {
    onEventSelect: (event: any) => void;
}

const EventDropdown: React.FC<EventDropdownProps> = ({ onEventSelect }) => {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://0.0.0.0:8000/api/events/')
          .then((response) => response.json())
          .then((data) => {
              const eventItems = data.map((item: any) => ({
                  id: item.pk,
                  title: item.fields.event_name,
              }));
              setEvents(eventItems);
          })
          .catch((error) => console.error('Error fetching events:', error));
    }, []);

    return (
        <Autocomplete
            options={events}
            getOptionLabel={(option) => option.title}
            onChange={(event, newValue) => onEventSelect(newValue)}
            renderInput={(params) => <TextField {...params} label="Select Event" variant="outlined" />}
        />
    );
};

export default EventDropdown;

