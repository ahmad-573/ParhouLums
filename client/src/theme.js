import { red, blue } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: blue[900],
    },
    tertiary: {
      main: '#1d1c1d'
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f2f3f5',
    },
  },
  spacing: 8
});

export default theme;