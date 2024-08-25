import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import { FieldProps } from 'formik';

interface DropdownProps extends FieldProps {
  label: string;
  options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ field, form, label, options }) => {
  const error = form.touched[field.name] && Boolean(form.errors[field.name]);

  return (
    <FormControl fullWidth margin="normal" error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...field}
        label={label}
        onChange={(event) => form.setFieldValue(field.name, event.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
