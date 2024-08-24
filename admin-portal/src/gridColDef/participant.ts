import { GridColDef } from '@mui/x-data-grid';

export const participantColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 100 },
  { field: 'age', headerName: 'Age', width: 70, type: 'number' },
  { field: 'phone', headerName: 'Phone', width: 120 },
  { field: 'gender', headerName: 'Gender', width: 120 },
  { field: 'role_type', headerName: 'Role', width: 140 },
  { field: 'badges', headerName: 'Badges', width: 140 },
  { field: 'training', headerName: 'Training', width: 140 },
  { field: 'streak', headerName: 'Streak', width: 140 },
];
