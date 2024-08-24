import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../constants/path';
import { useSnackbar } from 'notistack';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    age: Yup.number().required('Age is required').min(18, 'Must be at least 18 years old'),
    phone: Yup.string().required('Phone number is required').matches(/^[0-9]{10,15}$/, 'Phone number is not valid'),
    gender: Yup.string().required('Gender is required'),
    joinDate: Yup.date().required('Join Date is required'),
    skillset: Yup.string().required('Skillset is required'),
});

const StaffCreate: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(Path.Operations.Users.Volunteer);
    }

    const handleSubmit = async (values: any) => {
        try {
            const response = await fetch('http://0.0.0.0:8000/api/staff/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: values.name,
                    age: values.age,
                    phone: values.phone,
                    gender: values.gender,
                    join_date: values.joinDate,
                    skillset: values.skillset,
                }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            enqueueSnackbar('Staff created successfully!', { variant: 'success' });
            setTimeout(() => {
                navigate(Path.Operations.Users.Staff);
            }, 2000);
        } catch (error) {
            enqueueSnackbar(`Error creating staff`, { variant: 'error' });
        }
    }

    return (
        <Formik
            initialValues={{
                name: '',
                age: '',
                phone: '',
                gender: '',
                joinDate: '',
                skillset: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <Box component={Form} onSubmit={handleSubmit} sx={{ padding: '16px', margin: 3 }}>
                    <Typography variant="h5" color='primary' gutterBottom>
                        Create New Staff Member
                    </Typography>

                    <Field
                        as={TextField}
                        label="Name"
                        name="name"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        required
                    />

                    <Field
                        as={TextField}
                        label="Age"
                        name="age"
                        type="number"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.age}
                        error={touched.age && Boolean(errors.age)}
                        helperText={touched.age && errors.age}
                        required
                    />

                    <Field
                        as={TextField}
                        label="Phone Number"
                        name="phone"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone && errors.phone}
                        required
                    />

                    <Field
                        as={TextField}
                        label="Gender"
                        name="gender"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.gender}
                        error={touched.gender && Boolean(errors.gender)}
                        helperText={touched.gender && errors.gender}
                        required
                    />

                    <Field
                        as={TextField}
                        label="Join Date"
                        name="joinDate"
                        type="date"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.joinDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={touched.joinDate && Boolean(errors.joinDate)}
                        helperText={touched.joinDate && errors.joinDate}
                        required
                    />

                    <Field
                        as={TextField}
                        label="Skillset"
                        name="skillset"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.skillset}
                        error={touched.skillset && Boolean(errors.skillset)}
                        helperText={touched.skillset && errors.skillset}
                        required
                    />

                    <Box display='flex' columnGap={2} width='50%' height='20'>
                        <Button variant='outlined' fullWidth sx={{ mt: 2 }} onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Create Staff
                        </Button>
                    </Box>
                </Box>
            )}
        </Formik>
    );
};

export default StaffCreate;