import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import EventDropdown from '../../helpers/EventDropdown';
import { Typography, Box, Paper } from '@mui/material';

const AttendanceRate: React.FC = () => {
    const [attendanceData, setAttendanceData] = useState<any[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    useEffect(() => {
        fetch('http://0.0.0.0:8000/api/analytics/attendance')
          .then((response) => response.json())
          .then((data) => {
              const rows = data.map((item: any) => ({
                  id: item.pk,
                  ...item.fields,  
              }));
              console.log('row', data, rows)
              setAttendanceData(rows);
          })
          .catch((error) => console.error('Error fetching data:', error));
    }, []);
    console.log('data', attendanceData)

    const handleEventSelect = (event: any) => {
        if (event) {
            const eventDetails = attendanceData.find((e) => e.event_name === event.title);
            setSelectedEvent(eventDetails);
        } else {
            setSelectedEvent(null);
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', margin: 8, width: '400px' }}>
        <Typography variant="h6" gutterBottom>
          Attendance Rate
        </Typography>
        
        <Box sx={{marginTop: 4}}>
        <EventDropdown onEventSelect={handleEventSelect}/>
        </Box>
  
        <Box mt={3} display="flex" justifyContent="center">
          <PieChart
            width={400}
            height={300}
            series={[
              {
                data: attendanceData.map((entry: any) => ({
                  id: entry.id,
                  value: entry.value,
                  label: entry.label,
                })),
              },
            ]}
          />
        </Box>
      </Paper>
    );
};

export default AttendanceRate;

