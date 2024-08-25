import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CRMType } from '../constants/CRM';
import SendButton from '../helpers/SendButton';

export const emailColumns: GridColDef[] = [
  { field: 'subject', headerName: 'Subject', width: 350 },
  { field: 'body', headerName: 'Body', width: 350 },
  { field: 'recipient_list', headerName: 'Recipient', width: 350 },
  { field: 'receiver_group', headerName: 'Receiver Group', width: 200 },
  {
    field: 'send',
    headerName: 'Send',
    width: 100,
    renderCell: (params: GridRenderCellParams) => {
      return <SendButton row={params.row} type={CRMType.EMAIL}/>; 
    },
  },
];