import React, { useState } from 'react';
import { Box, Button, Chip, TextField, Typography, Autocomplete } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../constants/path';

const validationSchema = Yup.object({
    subject: Yup.string().required('Subject is required'),
    body: Yup.string().required('Body is required'),
});

const predefinedOptions = [
    { label: 'All Volunteers', value: 'all_volunteers' },
    { label: 'All Staff', value: 'all_staff' },
    { label: 'All Participants', value: 'all_participants' },
];

interface Props {
    isSidebarOpen: boolean;
}

const EmailCreate: React.FC<Props> = ({ isSidebarOpen }) => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    
    const containerWidth = isSidebarOpen ? '75%' : '90%';
    const [emailChips, setEmailChips] = useState<string[]>([]);

    const handleAddChip = (email: string) => {
        if (email && !emailChips.includes(email)) {
            setEmailChips([...emailChips, email]);
        }
    };

    const handleDeleteChip = (emailToDelete: string) => {
        setEmailChips((chips) => chips.filter((chip) => chip !== emailToDelete));
    };

    const handleCancel = () => {
        navigate(Path.CRM.Email)
    }

    const handleSubmit = async (values: any) => {
        try {
            const recipients = [...emailChips];

            // Check if one of the group options was selected
            if (values.recipientGroup) {
                recipients.push(values.recipientGroup.value); // Add the group value
            }

            const response = await fetch('http://0.0.0.0:8000/api/email/send/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: values.subject,
                    body: values.body,
                    recipients, // Send both individual emails and group options
                }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            enqueueSnackbar('Email sent successfully!', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Error sending email', { variant: 'error' });
        }
    };

    return (
        <Box style={{ margin: 10, width: containerWidth }}>
        <Formik
            initialValues={{
                subject: '',
                body: '',
                recipientGroup: null,
                emailInput: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
                <Box component={Form} onSubmit={handleSubmit} sx={{ padding: '16px', margin: 3 }}>
                    <Typography variant="h5" color='primary' gutterBottom>
                        Send Mass Email
                    </Typography>

                    <Field
                        as={TextField}
                        label="Subject"
                        name="subject"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.subject}
                        error={touched.subject && Boolean(errors.subject)}
                        helperText={touched.subject && errors.subject}
                        required
                    />

                    <Field
                        as={TextField}
                        label="Body"
                        name="body"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={6}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.body}
                        error={touched.body && Boolean(errors.body)}
                        helperText={touched.body && errors.body}
                        required
                    />

                    <Autocomplete
                        freeSolo
                        value={values.emailInput}
                        onChange={(event, newValue) => handleAddChip(newValue ? newValue : '')}
                        onInputChange={(event, newInputValue) => setFieldValue('emailInput', newInputValue)}
                        options={[]} 
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Enter email addresses"
                                variant="outlined"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && values.emailInput.trim() !== '') {
                                        e.preventDefault();
                                        handleAddChip(values.emailInput.trim());
                                        setFieldValue('emailInput', ''); 
                                    }
                                }}
                            />
                        )}
                        style={{
                            marginTop: '12px',
                        }}
                    />

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 2 }}>
                        {emailChips.map((email, index) => (
                            <Chip
                                key={index}
                                label={email}
                                onDelete={() => handleDeleteChip(email)}
                                sx={{ margin: '4px' }}
                            />
                        ))}
                    </Box>

                    <Autocomplete
                        options={predefinedOptions}
                        getOptionLabel={(option) => option.label}
                        onChange={(event, newValue) => setFieldValue('recipientGroup', newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Or choose a group"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                        style={{
                            marginTop: '5px',
                        }}
                    />

                    <Box display='flex' justifyContent='flex-end'columnGap={2} mt={2}>
                        <Button variant='outlined' onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Send Email
                        </Button>
                    </Box>
                </Box>
            )}
        </Formik>
        </Box>
    );
};

export default EmailCreate;
