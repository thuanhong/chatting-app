import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: '#0098D1',
    },
    secondary: {
      main: '#e73e33',
    },
    error: {
      main: '#CC0202',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    button: {
      textTransform: 'capitalize',
    },
    fontFamily: 'Roboto, sans-serif',
  },
});
