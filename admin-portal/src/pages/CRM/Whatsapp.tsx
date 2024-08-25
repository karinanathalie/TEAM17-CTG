import { Box, Breadcrumbs, Button, Paper, Stack, Typography } from "@mui/material";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { useTheme } from "../../theme";
import { useNavigate } from 'react-router-dom';
import { Path } from "../../constants/path";
import { whatsappColumns } from "../../gridColDef/whatsapp";

interface Props {
    isSidebarOpen: boolean;
}

const Whatsapp: React.FC<Props> = ({ isSidebarOpen }) => {
    const [whatsappTemplate, setWhatsappTemplate] = useState<any[]>([]);
    const containerWidth = isSidebarOpen ? '75%' : '90%';
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://0.0.0.0:8000/api/reminder/whatsapptemplates')
          .then((response) => response.json())
          .then((data) => {
              const rows = data.map((item: any) => ({
                  id: item.pk,
                  ...item.fields,  
              }));
              setWhatsappTemplate(rows);
          })
          .catch((error) => console.error('Error fetching data:', error));
    }, []);
    
    const handleEmailClick = () => {
        navigate(Path.CRM.CreateWhatsapp);  
    };

    const handleReminderClick = () => {
        navigate(Path.CRM.ReminderWhatsapp);  
    };

    return (
    <Box style={{ margin: 40, width: containerWidth }}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '16px' 
                }}
            >
                <Breadcrumbs>
                    <Typography variant='h5' color='primary'>Whatsapp Template</Typography>
                </Breadcrumbs>
                <Box sx={{ display: 'flex', columnGap: 2 }}>
                    <Button variant="outlined" color="primary" onClick={handleReminderClick}>
                        Send Event Reminder
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handleEmailClick}>
                        Send Whatsapp Message
                    </Button>
                </Box>
            </Box>

            <Stack style={{ marginTop: 20 }}>
                <div style={{ height: 680 }}>
                    <DataGrid
                        rows={whatsappTemplate} 
                        columns={whatsappColumns}  
                        getRowId={(row) => row.id} 
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 25 },
                            },
                        }}
                        pageSizeOptions={[25, 50]}
                        checkboxSelection
                        sx={{
                            '& .MuiDataGrid-columnHeader': {
                                backgroundColor: theme.palette.background.paper,
                                fontWeight: 'bold',
                            },
                        }}
                    />
                </div>
            </Stack>
        </Box>
    );
}

export default Whatsapp;

