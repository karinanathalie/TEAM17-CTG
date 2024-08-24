import { GridColDef } from '@mui/x-data-grid';

export const applicationColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'user', headerName: 'User', width: 400 },
  { field: 'event', headerName: 'Event', width: 400 },

];