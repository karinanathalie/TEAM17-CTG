import { CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { useTheme } from './theme'; 
import Sidebar from './sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { Path } from './constants/path';
import Participant from './pages/Users/Participant';
import Event from './pages/Event/Event';
import { useState } from 'react';
import EventCreate from './pages/Event/EventCreate';
import { SnackbarProvider } from 'notistack';
import Volunteer from './pages/Users/Volunteer';
import Staff from './pages/Users/Staff';
import VolunteerApplication from './pages/Application/VolunteerApplication';
import ParticipantApplication from './pages/Application/ParticipantApplication';
import StaffCreate from './pages/Users/StaffCreate';
import Email from './pages/CRM/Email';
import EmailCreate from './pages/CRM/EmailCreate';
import Whatsapp from './pages/CRM/Whatsapp';
import CalendarComponent from './pages/Event/Calendar';
import EmailReminder from './pages/CRM/EmailReminder';
import EventDetail from './pages/Event/EventDetail';
import WhatsappCreate from './pages/CRM/WhatsappCreate';
import WhatsappReminder from './pages/CRM/WhatsappReminder';
import AttendanceRate from './pages/Analytics/AttendanceRate';

function App() {
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <SnackbarProvider maxSnack={3}>
      <div style={{ display: 'flex' }}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Routes>
        <Route 
            path={Path.Root}
            element={
              <main style={{ flexGrow: 1, padding: theme.spacing(3) }}>
              <Typography>Welcome to Zubin's Admin Portal</Typography>
              </main>
            } 
        />
          <Route 
            path={Path.Analytics.Attendance}
            element={<AttendanceRate />} 
          />
          <Route 
            path={Path.Operations.Application.Volunteer}
            element={<VolunteerApplication isSidebarOpen={isSidebarOpen}/>} 
          />
          <Route 
            path={Path.Operations.Application.Participant}
            element={<ParticipantApplication isSidebarOpen={isSidebarOpen}/>} 
          />
          <Route 
            path={Path.Operations.Users.Participant}
            element={<Participant isSidebarOpen={isSidebarOpen}/>} 
          />
          <Route 
            path={Path.Operations.Users.Volunteer}
            element={<Volunteer isSidebarOpen={isSidebarOpen}/>} 
          />
          <Route 
            path={Path.Operations.Users.Staff}
            element={<Staff isSidebarOpen={isSidebarOpen}/>} 
          />
          <Route 
            path={Path.Operations.Users.StaffCreate}
            element={<StaffCreate />} 
          />
          <Route 
            path={Path.Event.Root}
            element={<Event isSidebarOpen={isSidebarOpen} />} 
          />
          <Route 
            path={Path.Event.Create}
            element={<EventCreate />}  
          />
          <Route 
            path={Path.Event.Edit}
            element={<EventDetail />}  
          />
          <Route 
            path={Path.Event.Calendar}
            element={<CalendarComponent isSidebarOpen={isSidebarOpen} />}  
          />
          <Route 
            path={Path.CRM.Email}
            element={<Email isSidebarOpen={isSidebarOpen} />} 
          />
          <Route 
            path={Path.CRM.CreateEmail}
            element={<EmailCreate isSidebarOpen={isSidebarOpen} />} 
          />
          <Route 
            path={Path.CRM.ReminderEmail}
            element={<EmailReminder isSidebarOpen={isSidebarOpen} />} 
          />
          <Route 
            path={Path.CRM.CreateWhatsapp}
            element={<WhatsappCreate isSidebarOpen={isSidebarOpen} />} 
          />
          <Route 
            path={Path.CRM.ReminderWhatsapp}
            element={<WhatsappReminder isSidebarOpen={isSidebarOpen} />} 
          />
          <Route 
            path={Path.CRM.Whatsapp}
            element={<Whatsapp isSidebarOpen={isSidebarOpen} />} 
          />
        </Routes>
      </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
