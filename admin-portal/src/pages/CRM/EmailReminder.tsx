import React, { useState } from 'react';
import { Box, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../constants/path';
import EventDropdown from '../../helpers/EventDropdown';  // Import the EventDropdown component

const validationSchema = Yup.object({
    selectedEvent: Yup.object().nullable().required('Event is required'),
});

interface Props {
    isSidebarOpen: boolean;
}

const EmailReminder: React.FC<Props> = ({ isSidebarOpen }) => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    
    const containerWidth = isSidebarOpen ? '75%' : '90%';

    const handleCancel = () => {
        navigate(Path.CRM.Email);
    };

    const handleSubmit = async (values: any) => {
        try {
            const response = await fetch(`http://0.0.0.0:8000/api/event/${values.selectedEvent.id}/sendreminder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            enqueueSnackbar('Email reminder sent successfully!', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Error sending email reminder', { variant: 'error' });
        }
    };

    return (
        <Box style={{ margin: 10, width: containerWidth }}>
        <Formik
            initialValues={{
                selectedEvent: null,
                saveTemplate: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
                <Box component={Form} onSubmit={handleSubmit} sx={{ padding: '16px', margin: 3 }}>
                    <Typography variant="h5" color='primary' gutterBottom>
                        Send Event Reminder
                    </Typography>

                    <Box style={{marginTop: 20}}>
                    <EventDropdown
                        onEventSelect={(event) => setFieldValue('selectedEvent', event)}
                    />
                    </Box>

                    {errors.selectedEvent && touched.selectedEvent && (
                        <Typography color="error" variant="body2">
                            {errors.selectedEvent}
                        </Typography>
                    )}

                    <Box display='flex' justifyContent='flex-end' columnGap={2} mt={2}>
                        <Button variant='outlined' onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Send Email Reminder
                        </Button>
                    </Box>
                </Box>
            )}
        </Formik>
        </Box>
    );
};

export default EmailReminder;
