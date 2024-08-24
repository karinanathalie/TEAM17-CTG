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
});

const EventCreate: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar(); 
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(Path.Event.Root)
    }

    const handleSubmit = async (values: any) => {
        try {
            const response = await fetch('http://0.0.0.0:8000/api/events/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    event_name: values.eventName,
                    event_description: values.eventDescription,
                    event_date: values.eventDate,
                    event_location: values.eventLocation,
                    target_population: values.targetPopulation,
                    skillset: values.skillset,
                    participant_quota: values.participantQuota,
                    volunteer_quota: values.volunteerQuota,
                    deadline: values.deadline,
                }),
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
            }}
            onSubmit={handleSubmit}
        />
    );
};

export default EventCreate;