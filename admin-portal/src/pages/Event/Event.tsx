import { Box, Breadcrumbs, Button, Paper, Stack, Typography } from "@mui/material";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { eventColumns } from '../../gridColDef/event' 
import { useTheme } from "../../theme";
import { useNavigate } from 'react-router-dom';
import { Path } from "../../constants/path";

interface EventProps {
    isSidebarOpen: boolean;
}

const Event: React.FC<EventProps> = ({ isSidebarOpen }) => {
    const [events, setEvents] = useState<any[]>([]);
    const containerWidth = isSidebarOpen ? '75%' : '90%';
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://0.0.0.0:8000/api/events/')
          .then((response) => response.json())
          .then((data) => {
              const eventRows = data.map((item: any) => ({
                  id: item.pk,
                  ...item.fields,  
              }));
              setEvents(eventRows);
          })
          .catch((error) => console.error('Error fetching events:', error));
    }, []);

    const handleClick = () => {
        navigate(Path.Event.Create);  
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
                    <Typography variant='h5' color='primary'>Event</Typography>
                </Breadcrumbs>
                <Button variant="outlined" color="primary" onClick={handleClick}>
                    Create
                </Button>
            </Box>

            <Stack style={{ marginTop: 20 }}>
                <div style={{ height: 680 }}>
                    <DataGrid
                        rows={events} 
                        columns={eventColumns}  
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

export default Event;
