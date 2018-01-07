// TODO: test _renderOptions & _renderSubOptions, test _toggleDropdownOptions

import React from 'react';
import {shallow} from 'enzyme';

import FilterByOptions from '../../../components/filters/FilterByOptions.js';

const handleOnChangeFilterOptions = jest.fn();

function filters() {
  return [
    {
      id: 2,
      name: 'Financial Management',
      children: [
        {
          id: 3,
          name: 'Bookkeeping/Accounting Software Training',
        },
        {
          id: 4,
          name: 'Budget, Financial Statement & Cash Flow Training',
        },
      ],
    },
    {
      id: 10,
      name: 'Capital',
      children: [
        {
          id: 11,
          name: 'Accelerator Programs',
        },
        {
          id: 12,
          name: 'Equity Investors: Angels',
        },
      ],
    },
  ];
}

// function items() {
//   return [];
// }

// describe('<FilterByOptions />', () => {
//   it('_renderOptions should return a dropdown menu with 2 options', () => {
//     const wrapper = shallow(
//       <FilterByOptions
//         className={'filterByOptions'}
//         filterName={'Business Services'}
//         filterOptions={filters()}
//         handleOnChangeFilterOptions={handleOnChangeFilterOptions}
//       />
//     );
//     const dropdownButton = wrapper.find('.filter-btn text-thin');
//     expect(wrapper.find('.dropdown-options').length).toEqual(1);
//   });
// });
