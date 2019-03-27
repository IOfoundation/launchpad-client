import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import LandingComponent from '../Landing';
import Title from '../Title';
import Items from './BlogPosts/Items';
import Pagination from '../../businesses/Pagination';

import {drafts, posted} from './BlogPosts/mocks';

class BlogPosts extends PureComponent {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  handleChangeIndex = index => {
    this.setState({value: index});
  };

  handleChangePage = selected => {
    console.log(selected);
  };

  render() {
    const {classes, router, theme} = this.props;
    const createEditService = () => {
      router.push('/admin/services/1');
    };

    return (
      <LandingComponent navigation={true}>
        <Title
          titleText="Your Blog Posts"
          hideCancelAction={true}
          submitLabel="Create Blog Post"
          submitClicked={createEditService}
        />
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
          <Tab
            disableRipple={true}
            label="Draft"
            classes={{
              root: classes.tabRoot,
              selected: classes.tabSelected,
              labelContainer: classes.labelRoot,
            }}
          />
          <Tab
            disableRipple={true}
            label="Posted"
            classes={{
              root: classes.tabRoot,
              selected: classes.tabSelected,
              labelContainer: classes.labelRoot,
            }}
          />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <Items items={drafts} />
          <Items items={posted} />
        </SwipeableViews>
        <Pagination
          appliedFilters={{category: 'admin-posts', page: 1}}
          handleChangePage={this.handleChangePage}
          metadata={{
            pagination: {
              last: {
                page: 10,
              },
              currentPage: 1,
            },
            totalOrganization: '10',
          }}
          noMargin={true}
        />
      </LandingComponent>
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

BlogPosts.propTypes = {
  classes: PropTypes.shape({
    item: PropTypes.string,
  }),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(BlogPosts);
