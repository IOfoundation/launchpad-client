import {createMuiTheme} from '@material-ui/core/styles';

export const muiTheme = createMuiTheme({
  palette: {
    primary: {main: '#fff'},
    secondary: {main: '#fff'},
    terciary: {main: '#fff'},
  },
  typography: {
    useNextVariants: true,
  },
  layout: {
    maxWidth: 1300,
  },
  fonts: {
    bold: '"proxima-nova-bold", Georgia, sans-serif',
  },
});
