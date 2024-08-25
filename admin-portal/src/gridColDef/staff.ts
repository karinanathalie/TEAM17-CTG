import { GridColDef } from '@mui/x-data-grid';

export const staffColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'name', headerName: 'Name', width: 120 },
  { field: 'age', headerName: 'Age', width: 70, type: 'number' },
  { field: 'email', headerName: 'Gender', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 200 },
  { field: 'nationality', headerName: 'Nationality', width: 200 },
  { field: 'ethnicity', headerName: 'Ethnicity', width: 200 },
];
