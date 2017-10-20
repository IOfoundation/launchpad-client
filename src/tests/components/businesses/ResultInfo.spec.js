import React from 'react';
import {shallow} from 'enzyme';

import ResultInfo from '../../../components/businesses/ResultInfo';
import {MdKeyboardArrowRight} from 'react-icons/lib/md';

function businessesMetadata(totalOrganizations) {
  return {
    pagination: {},
    totalOrganizations:  totalOrganizations
  };
};

function filterOptions() {
  return {
    businessTypes: [
      {
        id: 142,
        name: 'Startup or High-Growth Business'
      },
      {
        id: 143,
        name: 'Main Street or Small Business',
      },
      {
        id: 144,
        name: 'Microenterprise or Home Based Business',
      }
    ]
  }
}

const handleOnChangeFilterOptions = jest.fn();

describe('<ResultInfo />', () => {
  it('')
});

<ResultInfo
  businessesMetadata={this.props.businessesMetadata}
  handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
  filterOptions={this.props.filterOptions.businessTypes}
/>
