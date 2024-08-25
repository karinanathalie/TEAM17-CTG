import React from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../constants/path';
import { useSnackbar } from 'notistack';
import GenderDropdown from '../../helpers/GenderDropdown';
import Dropdown from '../../helpers/Dropdown';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    age: Yup.number().required('Age is required').min(18, 'Must be at least 18 years old'),
    phone: Yup.string().required('Phone number is required').matches(/^[0-9]{10,15}$/, 'Phone number is not valid'),
    gender: Yup.string().required('Gender is required'),
    nationality: Yup.string().required('Nationality is required'),
    ethnicity: Yup.string().required('Ethnicity is required'),
});

const StaffCreate: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(Path.Operations.Users.Volunteer);
    }

    const handleSubmit = async (values: any) => {
        try {
            const response = await fetch('http://0.0.0.0:8000/api/profile/staff/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: values.username,
                    password: values.password,
                    email: values.email,
                    name: values.name,
                    age: values.age,
                    phone: values.phone,
                    gender: values.gender,
                    nationality: values.nationality,
                    ethnicity: values.ethnicity,
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
                username: '',
                password: '',
                email: '',
                name: '',
                age: '',
                phone: '',
                gender: '',
                nationality: '',
                ethnicity: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <Box component={Form} onSubmit={handleSubmit} sx={{ padding: '16px', margin: 3 }}>
                    <Typography variant="h5" color='primary' gutterBottom>
                        Create New Staff Member
                    </Typography>

                    {/* User Info Section */}
                    <Typography variant="h6" color="secondary" gutterBottom style={{marginTop: 20}}>
                        I. User Info
                    </Typography>

                    <Field
                        as={TextField}
                        label="Username"
                        name="username"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                        required
                    />

                    <Field
                        as={TextField}
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        required
                    />

                    <Field
                        as={TextField}
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        required
                    />

                    <Divider sx={{ my: 3 }} />

                    {/* Profile Info Section */}
                    <Typography variant="h6" color="secondary" gutterBottom>
                        II. Profile Info
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
                        component={GenderDropdown}
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
                        component={Dropdown}
                        options={['Hong Kong', 'Non - Hong Kong']}
                        label="Nationality"
                        name="nationality"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nationality}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={touched.nationality && Boolean(errors.nationality)}
                        helperText={touched.nationality && errors.nationality}
                        required
                    />

                    <Field
                        component={Dropdown}
                        options={['Asian', 'Hispanic', 'Caucasian']}
                        name="ethnicity"
                        label="Ethnicity"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.ethnicity}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={touched.ethnicity && Boolean(errors.ethnicity)}
                        helperText={touched.ethnicity && errors.ethnicity}
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