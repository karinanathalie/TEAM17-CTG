import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditButton from '../helpers/EditButton';

export const eventColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'event_name', headerName: 'Event Name', width: 200 },
  { field: 'event_description', headerName: 'Description', width: 250 },
  { 
    field: 'event_date', 
    headerName: 'Date', 
    width: 180, 
    type: 'dateTime',
    valueGetter: (params) => {
      return new Date(params);
    }
  },
  { field: 'event_location', headerName: 'Location', width: 150 },
  { field: 'target_population', headerName: 'Target Population', width: 180 },
  { field: 'skillset', headerName: 'Skillset', width: 120 },
  { field: 'participant_quota', headerName: 'Participant Quota', width: 150, type: 'number' },
  { field: 'volunteer_quota', headerName: 'Volunteer Quota', width: 150, type: 'number' },
  { 
    field: 'deadline', 
    headerName: 'Deadline', 
    width: 180, 
    type: 'dateTime',
    valueGetter: (params) => {
      return new Date(params);
    }
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 100,
    renderCell: (params: GridRenderCellParams) => {
      return <EditButton eventId={params.row.id} />;
    },
  },
];