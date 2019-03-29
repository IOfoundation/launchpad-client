import React, {Fragment, PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class CustomTabs extends PureComponent {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  handleChangeIndex = index => {
    this.setState({value: index});
  };

  render() {
    const {tabs, children, classes, theme} = this.props;

    return (
      <Fragment>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          classes={{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator,
          }}
        >
          {tabs.map(tab => (
            <Tab
              key={tab}
              disableRipple={true}
              label={tab}
              classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected,
                labelContainer: classes.labelRoot,
              }}
            />
          ))}
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          {children}
        </SwipeableViews>
      </Fragment>
    );
  }
}

const styles = () => {
  return {
    tabsRoot: {
      borderBottom: 'none',
    },
    tabsIndicator: {
      backgroundColor: 'black',
    },
    tabRoot: {
      textTransform: 'initial',
      lineHeight: '24px',
      fontSize: '16px',
      background: 'none',
      minWidth: 'fit-content',
      minHeight: 'fit-content',
      fontFamily: '"proxima-nova-regular", Georgia, sans-serif',
      '&:hover': {
        color: '#00a472',
        opacity: 1,
      },
      '&$tabSelected': {
        color: 'black',
      },
      '&:focus': {
        color: 'black',
      },
    },
    tabSelected: {
      color: 'black',
    },
    labelRoot: {
      padding: '6px 8px',
    },
  };
};

CustomTabs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classes: PropTypes.shape({
    tabsRoot: PropTypes.string,
    tabsIndicator: PropTypes.string,
    tabRoot: PropTypes.string,
    tabSelected: PropTypes.string,
    labelRoot: PropTypes.string,
  }),
  tabs: PropTypes.arrayOf(PropTypes.string),
  theme: PropTypes.shape({
    direction: PropTypes.string,
  }),
};

export default withStyles(styles, {withTheme: true})(CustomTabs);
