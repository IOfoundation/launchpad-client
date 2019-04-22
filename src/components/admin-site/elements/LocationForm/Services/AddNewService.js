import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles} from '../styles';

import {combineStyles} from '@Utils';

const AddNewService = props => {
  const {classes, createServiceDisable, addAnotherServiceClicked} = props;

  return (
    <div className={`m-top-8 ${classes.btn}`}>
      <button
        className="btn btn__submit"
        onClick={addAnotherServiceClicked}
        disabled={createServiceDisable}
      >
        {'Add Another Service'}
      </button>
    </div>
  );
};

const styles = () => ({
  btn: {
    maxWidth: '260px',
  },
});

AddNewService.propTypes = {
  addAnotherServiceClicked: PropTypes.func,
  arrayHelpers: PropTypes.shape({}),
  classes: PropTypes.shape({
    formControl: PropTypes.string,
  }),
  createServiceDisable: PropTypes.bool,
};

export default withStyles(combineStyles(sharedStyles, styles))(AddNewService);
