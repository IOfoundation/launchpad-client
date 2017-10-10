import React from 'react';
import {PropTypes} from 'prop-types';
import {MdChevronRight, MdChevronLeft} from 'react-icons/lib/md';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    const {currentPage} = this.props.businessesMetadata.pagination;
    const className = currentPage == 1 ? 'pagination-arrow pagination-arrow-grey' : 'pagination-arrow';
    this.state = {
      className: 1,
    }
  }
  componentWillReceiveProps(_nextProps) {
    const {currentPage} = _nextProps.businessesMetadata.pagination;
    const className = currentPage == 1 ? 'pagination-arrow pagination-arrow-grey' : 'pagination-arrow';
    this.setState({className});
  }

  render() {
    const {currentPage} = this.props.businessesMetadata.pagination;
    const {last} = this.props.businessesMetadata.pagination;
    const nextPage = currentPage < last.page ? currentPage + 1 : last.page;
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    const pages = Array(last.page)
    .fill(1)
    .map((v, i) => v + i);
    const lastPages = pages.slice(Math.max(pages.length - 3, 1));
    const firstPages = pages.slice(0, 3);
    let prevPageArrow = null;
    prevPageArrow = (
      <MdChevronLeft
        className={this.state.className}
        size={17}
        color={'#fff'}
        style={{marginRight: 4}}
        onClick={() => this.props.handleChangePage(prevPage)}
      />
    );

    let nextPageArrow = null;
    nextPageArrow = (
      <MdChevronRight
        className="pagination-arrow"
        size={17}
        color={'#fff'}
        style={{marginLeft: 4}}
        onClick={() => this.props.handleChangePage(nextPage)}
      />
    );
    return (
      <div className={
          pages <= 1 ?
            'pagination-container-hide'
          :
            'text-center pagination between-xs middle-xs m-bot-100'}
      >
        <div>
          {prevPageArrow}
          {11 >= 10 ?
            firstPages.map(page => (
              <span
                className={
                  page == currentPage ?
                    'pagination-index pagination-index-primary'
                  :
                    'pagination-index pagination-index-primary-opacity '}
                key={page}
                onClick={() => this.props.handleChangePage(page)}>
                {page}
              </span>
            ))
            :
            pages.map(page => (
              <span
                className={
                  page == currentPage ?
                    'pagination-index pagination-index-primary'
                  :
                    'pagination-index pagination-index-primary-opacity '}
                key={page}
                onClick={() => this.props.handleChangePage(page)}
              >
                {page}
              </span>
            ))
          }
          {nextPageArrow}
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  businessesMetadata: PropTypes.object.isRequired,
  handleChangePage: PropTypes.func.isRequired,
};

export default Pagination;
