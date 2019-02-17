import React from 'react';
import {PropTypes} from 'prop-types';

const Loading = props => {
  return (
    <div className="load-div" {...props.elementConfig}>
      <img className="loader" src="/static-data/images/loader.gif" />
      <h3 className="loader-text text-regular">{'Loading'}</h3>
    </div>
  );
};

Loading.propTypes = {
  elementConfig: PropTypes.shape({}),
};

export default Loading;
