import React from 'react';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSnackbar } from 'notistack';
import { CRMType } from '../constants/CRM';

interface SendButtonProps {
  row: any; 
  type: string;
}

const SendButton: React.FC<SendButtonProps> = ({ row, type }) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleSendClick = async () => {
        try {
            
            if (type == CRMType.EMAIL) {
                const response = await fetch(`http://0.0.0.0:8000/api/reminder/emailtemplate/${row.id}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
            
                if (!response.ok) {
                    throw new Error('Failed to send reminder');
                }
            }
                enqueueSnackbar('Reminder sent successfully!', { variant: 'success' });
            
            if (type == CRMType.WHATSAPP) {
                const response = await fetch(`http://0.0.0.0:8000/api/reminder/whatsapptemplate/${row.id}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
            
                if (!response.ok) {
                    throw new Error('Failed to send reminder');
                }
            }

        } catch (error) {
          enqueueSnackbar('Error sending reminder', { variant: 'error' });
          console.error('Error sending reminder:', error);
        }
      };

  return (
    <IconButton color="primary" onClick={handleSendClick}>
      <SendIcon />
    </IconButton>
  );
};

export default SendButton;

