import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';
import {Colors} from '../styles/Colors';
import '../styles/main.scss';

const muiTheme = createMuiTheme({
  palette: {
    primary: {main: Colors.brandPrimary},
    secondary: {main: Colors.brandSecondary},
    terciary: {main: Colors.brandPurple},
  },
  typography: {
    useNextVariants: true,
  },
});

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.children !== nextProps.children;
  }
  render() {
    return (
      <MuiThemeProvider theme={muiTheme}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};
export default App;
