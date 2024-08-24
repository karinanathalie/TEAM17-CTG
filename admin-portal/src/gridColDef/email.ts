import { GridColDef } from '@mui/x-data-grid';

export const emailColumns: GridColDef[] = [
  { field: 'subject', headerName: 'Subject', width: 350 },
  { field: 'body', headerName: 'Body', width: 350 },
  { field: 'receiver_group', headerName: 'Receiver Group', width: 200 },
  { field: 'recipient_list', headerName: 'Recipient', width: 350 },
];