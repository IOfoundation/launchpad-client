import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../styles/MuiTheme';
import '../styles/main.scss';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.children !== nextProps.children;
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};
export default App;
