import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../constants/path';
import { useSnackbar } from 'notistack';
import EventForm from './EventForm';

const validationSchema = Yup.object({
    eventName: Yup.string().required('Event name is required'),
    eventDescription: Yup.string(),
    eventDate: Yup.date().required('Event date is required'),
    eventLocation: Yup.string().required('Event location is required'),
    targetPopulation: Yup.string(),
    skillset: Yup.string(),
    participantQuota: Yup.number().required('Participant quota is required').min(1, 'Minimum 1 participant'),
    volunteerQuota: Yup.number().required('Volunteer quota is required').min(1, 'Minimum 1 volunteer'),
    deadline: Yup.date().required('Registration deadline is required'),
    eventImage: Yup.mixed().required('Event image is required')
});

const EventCreate: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar(); 
    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append('event_name', values.eventName);
            formData.append('event_description', values.eventDescription);
            formData.append('event_date', values.eventDate);
            formData.append('event_location', values.eventLocation);
            formData.append('target_population', values.targetPopulation);
            formData.append('skillset', values.skillset);
            formData.append('participant_quota', values.participantQuota.toString());
            formData.append('volunteer_quota', values.volunteerQuota.toString());
            formData.append('deadline', values.deadline);
    
            // Only append the file if it exists
            if (values.eventImage) {
                formData.append('event_image', values.eventImage);
            }
    
            const response = await fetch('http://0.0.0.0:8000/api/events/create/', {
                method: 'POST',
                // Do not set Content-Type header, it will be automatically set to multipart/form-data
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            enqueueSnackbar('Event created successfully!', { variant: 'success' });
            setTimeout(() => {
                navigate(Path.Event.Root);
            }, 2000);
        } catch (error) {
            enqueueSnackbar(`Error creating event`, { variant: 'error' });
        }
    }

    return (
        <EventForm
            initialValues={{
                eventName: '',
                eventDescription: '',
                eventDate: '',
                eventLocation: '',
                targetPopulation: '',
                skillset: '',
                participantQuota: '',
                volunteerQuota: '',
                deadline: '',
                eventImage: null
            }}
            onSubmit={handleSubmit}
        />
    );
};

export default EventCreate;