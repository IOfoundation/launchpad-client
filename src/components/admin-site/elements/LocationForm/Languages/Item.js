import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import {sharedStyles, sharedClasses} from '../styles';

class Item extends PureComponent {
  deleteItem = () => {
    const {arrayHelpers, id} = this.props;

    arrayHelpers.remove(id);
  };

  render() {
    const {language, classes} = this.props;

    return (
      <div className={classes.serviceSelected}>
        <span>{language}</span>
        <i
          className="material-icons title-as-link"
          aria-owns={'service-menu-item'}
          aria-haspopup="true"
          onClick={this.deleteItem}
        >
          {'delete'}
        </i>
      </div>
    );
  }
}

Item.propTypes = {
  arrayHelpers: PropTypes.shape({}),
  classes: sharedClasses,
  handleChange: PropTypes.func,
  id: PropTypes.number,
  language: PropTypes.string,
};

export default withStyles(sharedStyles)(Item);
