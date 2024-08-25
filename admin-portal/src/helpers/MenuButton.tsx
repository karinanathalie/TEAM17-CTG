import React from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface MenuButtonProps {
  row: any;
}

const MenuButton: React.FC<MenuButtonProps> = ({ row }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApprove = () => {
    console.log(`Approving application ID: ${row.id}`);
    // Logic to approve the application
    handleClose();
  };

  const handleDisapprove = () => {
    console.log(`Disapproving application ID: ${row.id}`);
    // Logic to disapprove the application
    handleClose();
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

