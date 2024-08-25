import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CRMType } from '../constants/CRM';
import SendButton from '../helpers/SendButton';

export const whatsappColumns: GridColDef[] = [
  { field: 'message', headerName: 'Body', width: 350 },
  { field: 'recipient_list', headerName: 'Recipient', width: 350 },
  { field: 'receiver_group', headerName: 'Receiver Group', width: 200 },
  {
    field: 'send',
    headerName: 'Send',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return <SendButton row={params.row} type={CRMType.WHATSAPP}/>; 
    },
  },
];