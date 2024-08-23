import { CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { useTheme } from './theme'; 
import Sidebar from './sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { Path } from './constants/path';
import PrivateEvent from './pages/Application/PrivateEvent';
import Participant from './pages/Users/Participant';

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <div style={{ display: 'flex' }}>
        <Sidebar />
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
            path={Path.Operations.Application.PrivateEvent}
            Component={PrivateEvent}
        />
          <Route 
            path={Path.Operations.Users.Participant}
            Component={Participant}
        />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
