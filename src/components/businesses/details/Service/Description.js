import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {truncate} from '../../../../utils';

class Description extends PureComponent {
  state = {
    viewMore: false,
  };

  viewMoreHandler = () => {
    this.setState(prevState => {
      return {
        viewMore: !prevState.viewMore,
      };
    });
  };

  render() {
    const {description} = this.props;
    const {viewMore} = this.state;
    let $viewMore = (
      <p className="business-details-section__information__content">
        {description}
      </p>
    );

    if (description.split(' ').length > 50) {
      $viewMore = (
        <p className="business-details-section__information__content">
          {viewMore ? description : truncate(description)}
          <a
            className="service__view-more text-semi"
            onClick={this.viewMoreHandler}
          >
            {viewMore ? 'View Less' : 'View More'}
          </a>
        </p>
      );
    }

    return $viewMore;
  }
}

Description.propTypes = {
  description: PropTypes.string,
};

export default Description;
