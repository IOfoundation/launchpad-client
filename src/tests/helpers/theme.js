import {createMuiTheme} from '@material-ui/core/styles';

export const muiTheme = createMuiTheme({
  palette: {
    primary: {main: '#fff'},
    secondary: {main: '#fff'},
    terciary: {main: '#fff'},
    grey: {
      main: '#7B7C7E',
    },
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
