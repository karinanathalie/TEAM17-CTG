import { Chip } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import MenuButton from '../helpers/MenuButton';

export const volunteerApplicationColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'user_profile_name', headerName: 'User', width: 200 },
  { field: 'event_name', headerName: 'Event', width: 200 },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: 180,
    renderCell: (params: GridRenderCellParams) => {
      let color: 'default' | 'success' | 'warning' | 'error' = 'default';
      console.log('this is params', params, params.value)
      switch (params.value) {
        case 'pending':
          color = 'warning';
          break;
        case 'successful':
          color = 'success';
          break;
        case 'unsuccessful':
          color = 'error';
          break;
        default:
          color = 'default';
      }
      return <Chip label={params.value} color={color} />;
    },
  },
  { 
    field: 'reason_joining', headerName: 'Reason', width: 200 },
  { 
    field: 'cv_file', 
    headerName: 'CV', 
    width: 200, 
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Chip 
          label="View CV" 
          component="a"
          href={`http://localhost:8000/${params.row.cv_file}`} 
          clickable 
          target="_blank" 
          rel="noopener noreferrer"
          color="primary"
          variant="outlined"
        />
      );
    },
  },
  {
    field: 'menu',
    headerName: 'Menu',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return <MenuButton row={params.row} />; 
    },
  },
];