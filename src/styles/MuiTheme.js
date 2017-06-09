import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Colors} from './Colors';

export const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Colors.brandPrimary,
    primary2Color: Colors.brandSecondary,
  },
});
