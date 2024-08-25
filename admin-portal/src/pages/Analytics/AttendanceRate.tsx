import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import EventDropdown from '../../helpers/EventDropdown';
import { Typography, Box, Paper } from '@mui/material';
import { BarPlot, ChartContainer } from '@mui/x-charts';

const AttendanceRate: React.FC = () => {
    const [attendanceData, setAttendanceData] = useState<any[]>([]);
    const [demographicData, setDemographicData] = useState<any[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    useEffect(() => {
        fetch('http://0.0.0.0:8000/api/analytics/attendance')
            .then((response) => response.json())
            .then((data) => {
                setAttendanceData(data.data);
            })
            .catch((error) => console.error('Error fetching events:', error));
    }, []);

    useEffect(() => {
        fetch('http://0.0.0.0:8000/api/analytics/demographic')
            .then((response) => response.json())
            .then((data) => {
                setDemographicData(data.data);
            })
            .catch((error) => console.error('Error fetching events:', error));
    }, []);

    const handleEventSelect = (event: any) => {
        if (event) {
            const eventAttendance = attendanceData?.find((e) => e.event_name === event.title);
            const eventDemographics = demographicData?.find((e) => e?.event_name === event.title);
            setSelectedEvent(eventAttendance);
            setDemographicData([eventDemographics]);
        } else {
            setSelectedEvent(null);
        }
    };

    return (
        <>
        <Paper elevation={3} sx={{ padding: '20px', marginTop: 8, marginLeft: 8, width: '1200px' }}>
            <Typography variant="h5" gutterBottom>
                User Distribution 
            </Typography>

            <Box sx={{ marginTop: 4 }}>
                <EventDropdown onEventSelect={handleEventSelect} />
            </Box>
            {selectedEvent && selectedEvent['data'].length > 0 &&
                <Paper key={selectedEvent['data'].event_id} elevation={3} sx={{ padding: 3, marginTop: 4 }}>
            <Typography variant="h6" gutterBottom>
                Attendance Analysis
            </Typography>
                <Box mt={3} display="flex" justifyContent="center">
                    <PieChart
                        width={400}
                        height={300}
                        series={[
                            {
                                data: selectedEvent['data'],
                            },
                        ]} />
                </Box>
                </Paper>
            }

        <Box>
            {demographicData && demographicData.map((eventData) => {
            const xLabels = eventData?.xLabels;
            const yData = eventData?.yData;

            return (
                xLabels && xLabels.length > 0 && (
                <Paper key={eventData.event_id} elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Demographic Analysis
                    </Typography>
                    <ChartContainer
                        width={500}
                        height={300}
                        series={[{ data: yData, label: 'Demographics', type: 'bar' }]}
                        xAxis={[{ scaleType: 'band', data: xLabels }]}
                    >
                        <BarPlot />
                    </ChartContainer>
                </Paper>
                )
            );
        })}
        </Box>
            </Paper>
            </>
    );
};

export default AttendanceRate;

