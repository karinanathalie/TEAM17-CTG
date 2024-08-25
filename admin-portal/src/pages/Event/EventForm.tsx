import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../constants/path';
import { useSnackbar } from 'notistack';

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

interface EventFormProps {
    initialValues: any;
    onSubmit: (values: any) => void;
    isUpdate?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ initialValues, onSubmit, isUpdate = false }) => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(Path.Event.Root)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit,  setFieldValue  }) => (
                <Box component={Form} onSubmit={handleSubmit} sx={{ padding: '16px', margin: 3 }}>
                    <Typography variant="h5" color='primary' gutterBottom>
                        {isUpdate ? "Update Event" : "Create Event"}
                    </Typography>

                    <Field
                        as={TextField}
                        label="Event Name"
                        name="eventName"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.eventName}
                        error={touched.eventName && Boolean(errors.eventName)}
                        helperText={touched.eventName && errors.eventName}
                        required />

                    <Field
                        as={TextField}
                        label="Event Description"
                        name="eventDescription"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.eventDescription}
                        multiline
                        rows={4} />

                    <Field
                        as={TextField}
                        label="Event Date"
                        name="eventDate"
                        type="datetime-local"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.eventDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={touched.eventDate && Boolean(errors.eventDate)}
                        helperText={touched.eventDate && errors.eventDate}
                        required />

                    <Field
                        as={TextField}
                        label="Event Location"
                        name="eventLocation"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.eventLocation}
                        error={touched.eventLocation && Boolean(errors.eventLocation)}
                        helperText={touched.eventLocation && errors.eventLocation}
                        required />

                    <Field
                        as={TextField}
                        label="Target Population"
                        name="targetPopulation"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.targetPopulation} />

                    <Field
                        as={TextField}
                        label="Skillset"
                        name="skillset"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.skillset} />

                    <Field
                        as={TextField}
                        label="Participant Quota"
                        name="participantQuota"
                        type="number"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.participantQuota}
                        error={touched.participantQuota && Boolean(errors.participantQuota)}
                        helperText={touched.participantQuota && errors.participantQuota}
                        required />

                    <Field
                        as={TextField}
                        label="Volunteer Quota"
                        name="volunteerQuota"
                        type="number"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.volunteerQuota}
                        error={touched.volunteerQuota && Boolean(errors.volunteerQuota)}
                        helperText={touched.volunteerQuota && errors.volunteerQuota}
                        required />

                    <Field
                        as={TextField}
                        label="Registration Deadline"
                        name="deadline"
                        type="datetime-local"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.deadline}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={touched.deadline && Boolean(errors.deadline)}
                        helperText={touched.deadline && errors.deadline}
                        required />
                    
                    <Box mt={2}>
                        <Typography variant="body1">Event Image</Typography>
                            {values.eventImage && typeof values.eventImage === 'string' && (
                            <Box
                            mt={2}
                            sx={{
                                border: '1px solid rgba(0, 0, 0, 0.23)', 
                                borderRadius: '8px',  
                                padding: '16px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                maxWidth: '400px',
                                height: 'auto',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
                            }}
                        >
                            <img
                                src={`http://localhost:8000/api/pic/${values.eventImage}`}
                                alt="Event"
                                style={{ width: '100%', height: 'auto', borderRadius: '8px' }} 
                            />
                        </Box>
                            )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => setFieldValue('eventImage', event.currentTarget.files?.[0])}
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: 14,
                                marginTop: 15,
                            }}
                        />
                    </Box>

                    <Box display='flex' columnGap={2} width='50%' height='20'>
                        <Button variant='outlined' fullWidth sx={{ mt: 2 }} onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            {isUpdate ? "Update Event" : "Create Event"}
                        </Button>
                    </Box>
                </Box>
            )}
        </Formik>
    );
};

export default EventForm;