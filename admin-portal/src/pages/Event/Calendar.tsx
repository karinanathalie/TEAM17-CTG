import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import { generatePath, useNavigate } from 'react-router-dom';
import { Path } from '../../constants/path';
import { useTheme } from '../../theme';

const localizer = momentLocalizer(moment);

interface EventProps {
    isSidebarOpen: boolean;
}

const CalendarComponent: React.FC<EventProps> = ({ isSidebarOpen }) => {
    const [events, setEvents] = useState<any[]>([]);
    const containerWidth = isSidebarOpen ? '75%' : '90%';
    const theme = useTheme();
    const navigate = useNavigate();

    const handleEventClick = (event: any) => {
        const eventId = event.id; 
        const path = generatePath(Path.Event.Edit, { id: eventId });
        navigate(path);
    };

    useEffect(() => {
        fetch('http://0.0.0.0:8000/api/events/')
          .then((response) => response.json())
          .then((data) => {
              const eventItems = data.map((item: any) => ({
                  id: item.pk,
                  title: item.fields.event_name,
                  start: new Date(item.fields.event_date),
                  end: new Date(item.fields.event_date),
              }));
              setEvents(eventItems);
          })
          .catch((error) => console.error('Error fetching events:', error));
    }, []);

    const handleClick = () => {
        navigate(Path.Event.Create);  
    };

    return (
        <Box style={{ margin: 40, width: containerWidth }}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '16px' 
                }}
            >
                <Breadcrumbs>
                    <Typography variant='h5' color='primary'>Calendar</Typography>
                </Breadcrumbs>
                <Button variant="outlined" color="primary" onClick={handleClick}>
                    Create Event
                </Button>
            </Box>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 680 }}
                eventPropGetter={() => ({
                    style: { 
                        backgroundColor: theme.palette.primary.main, 
                        color: theme.palette.primary.contrastText,
                        padding: 5,
                        textAlign: 'center',
                    },
                })}
                onSelectEvent={handleEventClick}
            />
        </Box>
    );
}

export default CalendarComponent;
