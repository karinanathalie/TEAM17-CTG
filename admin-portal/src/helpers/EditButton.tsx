import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { generatePath, useNavigate } from 'react-router-dom';
import { Path } from '../constants/path';

interface EditButtonProps {
  eventId: string;
}

const EditButton: React.FC<EditButtonProps> = ({ eventId }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    const editPath = generatePath(Path.Event.Edit, { id: eventId });
    navigate(editPath);
  };

  return (
    <IconButton onClick={handleEditClick} color="primary">
      <EditIcon />
    </IconButton>
  );
};

export default EditButton;
