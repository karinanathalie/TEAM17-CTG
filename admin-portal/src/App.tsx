import { CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { useTheme } from './theme'; 
import Sidebar from './sidebar/Sidebar';

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: theme.spacing(3) }}> 
          <Typography>Welcome to Zubin's Admin Portal</Typography>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
