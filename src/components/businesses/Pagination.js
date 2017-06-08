import React from 'react';
import {PropTypes} from 'prop-types';
import MetaInfoBusinesses from './MetaInfoBusinesses';

class Pagination extends React.Component {
  render() {
    const {currentPage} = this.props.businessesMetadata.pagination;
    const {nextPage} = this.props.businessesMetadata.pagination;
    let prevPageArrow = null;
    if (currentPage > 1) {
      prevPageArrow = (
        <span onClick={() => this.props.handleChangePage(currentPage - 1)}>
          {'<'}
        </span>
      );
    }

    let nextPageArrow = null;
    if (nextPage) {
      nextPageArrow = (
        <span onClick={() => this.props.handleChangePage(nextPage)}>{'>'}</span>
      );
    }
    return (
      <div>
        <MetaInfoBusinesses
          businessesMetadata={this.props.businessesMetadata}
        />
        {prevPageArrow}
        <span>{' '}</span>
        {nextPageArrow}
      </div>
    );
  }
}

Pagination.PropTypes = {
  businessesMetadata: PropTypes.object.isRequired,
  handleChangePage: PropTypes.func.isRequired,
};

export default Pagination;
