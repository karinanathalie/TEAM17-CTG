import { Box, Breadcrumbs, Button, Paper, Stack, Typography } from "@mui/material";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { useTheme } from "../../theme";
import { useNavigate } from 'react-router-dom';
import { Path } from "../../constants/path";
import { applicationColumns } from "../../gridColDef/application";

interface Props {
    isSidebarOpen: boolean;
}

const Email: React.FC<Props> = ({ isSidebarOpen }) => {
    const [emailTemplate, setEmailTemplate] = useState<any[]>([]);
    const containerWidth = isSidebarOpen ? '75%' : '90%';
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://0.0.0.0:8000/api/applications/participants')
          .then((response) => response.json())
          .then((data) => {
              const rows = data.map((item: any) => ({
                  id: item.pk,
                  ...item.fields,  
              }));
              setEmailTemplate(rows);
          })
          .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleClick = () => {
        navigate(Path.CRM.CreateEmail);  
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
                    <Typography variant='h5' color='primary'>Email Template</Typography>
                </Breadcrumbs>
                <Button variant="outlined" color="primary" onClick={handleClick}>
                    Send Email
                </Button>
            </Box>

            <Stack style={{ marginTop: 20 }}>
                <div style={{ height: 680 }}>
                    <DataGrid
                        rows={emailTemplate} 
                        columns={applicationColumns}  
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

export default Email;
