import React from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSnackbar } from 'notistack';

interface MenuButtonProps {
  row: any;
}

const MenuButton: React.FC<MenuButtonProps> = ({ row }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApprove = async () => {
    try {
      const response = await fetch(`http://0.0.0.0:8000/api/application/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          application_id: row.id,
          status: 'successful',
        }),
      });

      if (!response.ok) {
        throw new Error('Error approving the application');
      }

      enqueueSnackbar('Application approved successfully!', { variant: 'success' });
      handleClose();
    } catch (error) {
      enqueueSnackbar('Failed to approve application', { variant: 'error' });
      handleClose();
    }
  };

  const handleDisapprove = async () => {
    try {
      const response = await fetch(`http://0.0.0.0:8000/api/application/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          application_id: row.id,
          status: 'unsuccessful', // Updating the status to 'unsuccessful'
        }),
      });

      if (!response.ok) {
        throw new Error('Error disapproving the application');
      }

      enqueueSnackbar('Application disapproved successfully!', { variant: 'success' });
      handleClose();
    } catch (error) {
      enqueueSnackbar('Failed to disapprove application', { variant: 'error' });
      handleClose();
    }
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleApprove}>Approve</MenuItem>
        <MenuItem onClick={handleDisapprove}>Disapprove</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuButton;

