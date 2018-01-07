import React from 'react';
import {shallow} from 'enzyme';

import FilterBox from '../../../components/filters/FilterBox.js';

const getTextSearchResults = jest.fn();
const handleClickOnClearAllFilters = jest.fn();
const handleOnChangeFilterOptions = jest.fn();
const getFilterChips = jest.fn();

function filters() {
  return {
    filters: [
      {
        businessServices: [
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
        ],
      },
      {
        businessTypes: [
          {
            id: 142,
            name: 'Startup or High-Growth Business',
          },
          {
            id: 143,
            name: 'Main Street or Small Business',
          },
        ],
      },
      {
        stages: [
          {
            id: 146,
            name: 'Idea/Inception',
          },
          {
            id: 147,
            name: 'Proof of Concept/Prototype/Market Intro',
          },
        ],
      },
      {
        communities: [
          {
            id: 151,
            name: 'African American',
          },
          {
            id: 156,
            name: 'Native American',
          },
        ],
      },
      {
        industries: [
          {
            id: 172,
            name: 'Management',
          },
          {
            id: 180,
            name: 'Retail',
          },
        ],
      },
    ],
  };
}

function items() {
  return [];
}

// describe('<FilterBox />', () => {
//   it('Should return 1 FilterByText Component', () => {
//     const wrapper = shallow(
//       <FilterBox
//         getTextSearchResults={getTextSearchResults}
//         filterOptions={filters()}
//         items={items()}
//         handleClickOnClearAllFilters={handleClickOnClearAllFilters}
//         handleOnChangeFilterOptions={handleOnChangeFilterOptions}
//         getFilterChips={getFilterChips}
//       />
//     );
//     expect(wrapper.find('.filterByText').length).toEqual(1);
//   });
//
//   it('Should return 4 FilterByOption Components', () => {
//     const wrapper = shallow(
//       <FilterBox
//         getTextSearchResults={getTextSearchResults}
//         filterOptions={filters()}
//         items={items()}
//         handleClickOnClearAllFilters={handleClickOnClearAllFilters}
//         handleOnChangeFilterOptions={handleOnChangeFilterOptions}
//         getFilterChips={getFilterChips}
//       />
//     );
//     expect(wrapper.find('.filterByOptions').length).toEqual(4);
//   });
// });
