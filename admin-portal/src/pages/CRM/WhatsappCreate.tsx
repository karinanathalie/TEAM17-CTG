import React, { useState } from 'react';
import { Box, Button, Chip, TextField, Typography, Autocomplete, FormControlLabel, Checkbox } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../constants/path';

const validationSchema = Yup.object({
    body: Yup.string().required('Body is required'),
    recipientGroup: Yup.object().nullable().notRequired(),
    phone: Yup.string().nullable().notRequired(),
    saveTemplate: Yup.boolean().notRequired(),
});


const predefinedOptions = [
    { label: 'All Volunteers', value: 'all_volunteers' },
    { label: 'All Staff', value: 'all_staff' },
    { label: 'All Participants', value: 'all_participants' },
];

interface Props {
    isSidebarOpen: boolean;
}

const WhatsappCreate: React.FC<Props> = ({ isSidebarOpen }) => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    
    const containerWidth = isSidebarOpen ? '75%' : '90%';
    const [numberChips, setNumberChips] = useState<string[]>([]);

    const handleAddChip = (number: string) => {
        if (number && !numberChips.includes(number)) {
            setNumberChips([...numberChips, number]);
        }
    };

    const handleDeleteChip = (emailToDelete: string) => {
        setNumberChips((chips) => chips.filter((chip) => chip !== emailToDelete));
    };

    const handleCancel = () => {
        navigate(Path.CRM.Whatsapp)
    }

    const handleSubmit = async (values: any) => {
        try {
            const recipients = [...numberChips];

            // Check if one of the group options was selected
            if (values.recipientGroup) {
                recipients.push(values.recipientGroup.value); // Add the group value
            }

            const response = await fetch('http://0.0.0.0:8000/api/reminder/sendwhatsapp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: values.body,
                    save_as_template: values.saveTemplate,  
                    phone_numbers: recipients.length > 0 ? recipients : [],  
                    group: values.recipientGroup ? values.recipientGroup.value : null, 
                }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            enqueueSnackbar('Email sent successfully!', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Error sending number', { variant: 'error' });
        }
    };

    return (
        <Box style={{ margin: 10, width: containerWidth }}>
        <Formik
            initialValues={{
                body: '',
                recipientGroup: null,
                emailInput: '',
                saveTemplate: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
                <Box component={Form} onSubmit={handleSubmit} sx={{ padding: '16px', margin: 3 }}>
                    <Typography variant="h5" color='primary' gutterBottom>
                        Send Whatsapp Message
                    </Typography>

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
                                label="Enter number"
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
                        {numberChips.map((number, index) => (
                            <Chip
                                key={index}
                                label={number}
                                onDelete={() => handleDeleteChip(number)}
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

                    <Field
                        as={FormControlLabel}
                        control={
                            <Checkbox
                                name="saveTemplate"
                                color="primary"
                                checked={values.saveTemplate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        }
                        label="Save as whatsapp template"
                        style={{
                            marginTop: '10px',
                        }}
                    />

                    <Box display='flex' justifyContent='flex-end'columnGap={2} mt={2}>
                        <Button variant='outlined' onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Send Message
                        </Button>
                    </Box>
                </Box>
            )}
        </Formik>
        </Box>
    );
};

export default WhatsappCreate;
