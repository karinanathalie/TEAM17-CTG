import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import EventForm from './EventForm';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Path } from '../../constants/path';

const EventDetail: React.FC = () => {
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [initialValues, setInitialValues] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://0.0.0.0:8000/api/events/${id}/`);
                const data = await response.json();
                if (data.length > 0) {
                    const event = data[0].fields;
    
                    setInitialValues({
                        eventName: event.event_name,
                        eventDescription: event.event_description,
                        eventDate: event.event_date,
                        eventLocation: event.event_location,
                        targetPopulation: event.target_population,
                        skillset: event.skillset,
                        participantQuota: event.participant_quota,
                        volunteerQuota: event.volunteer_quota,
                        deadline: event.deadline,
                        eventImage: event.event_image
                    });
                }
            } catch (error) {
                enqueueSnackbar('Error fetching event details', { variant: 'error' });
            }
        };

        fetchEvent();
    }, [id]);

    const handleSubmit = async (values: any) => {
        try {
            const response = await fetch(`http://0.0.0.0:8000/api/events/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            enqueueSnackbar('Event updated successfully!', { variant: 'success' });
            setTimeout(() => {
                navigate(Path.Event.Root);
            }, 2000);
        } catch (error) {
            enqueueSnackbar('Error updating event', { variant: 'error' });
        }
    };

    return (
        initialValues ? (
            <Box style={{ margin: 10 }}>
                <EventForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    isUpdate={true}
                />
            </Box>
        ) : null
    );
};

export default EventDetail;
