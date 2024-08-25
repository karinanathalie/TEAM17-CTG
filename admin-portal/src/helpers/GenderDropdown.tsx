import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import { FieldProps } from 'formik';

interface GenderDropdownProps extends FieldProps {
  label: string;
}

const GenderDropdown: React.FC<GenderDropdownProps> = ({ field, form, label }) => {
  const error = form.touched[field.name] && Boolean(form.errors[field.name]);

  return (
    <FormControl fullWidth margin="normal" error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...field}
        label={label}
        onChange={(event) => form.setFieldValue(field.name, event.target.value)}
      >
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </Select>
    </FormControl>
  );
};

export default GenderDropdown;
