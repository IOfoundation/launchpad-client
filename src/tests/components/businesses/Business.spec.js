import React from 'react';
import {shallow} from 'enzyme';

import Business from '../../../components/businesses/Business';

const handleClickOnBusiness = jest.fn();

function mockOrganization() {
  return {
    id: 1,
    name: 'organization1',
    description: 'orgDescription',
    email: 'jondoe@something.org',
    contacts: [],
    phones: [
      {
        id: 1,
        number: '(123) 456 - 7890',
      }
    ],
    locations: [
      {
        id: 1,
        name: 'location1',
        address: {
          address_1: '123 Road St',
          address_2: null,
          city: 'Sacramento',
          state_province: 'CA',
          postal_code: '12345'
        }
      },
      {
        id: 2,
        name: 'location2',
        address: {
          address_1: '456 Street Rd',
          address_2: null,
          city: 'Sacramento',
          state_province: 'CA',
          postal_code: '12345'
        }
      },
    ],
    services: [
      {
        id: 1,
        name: 'service1',
        description: 'lorem ipsum...',
        email: null,
        phones: [],
        categories: [
          {
            id: 54,
            name: 'category1',
          },
          {
            id: 55,
            name: 'category2',
          },
          {
            id: 56,
            name: 'category3',
          },
        ],
      },
      {
        id: 2,
        name: 'service2',
        description: 'lorem ipsum...',
        email: null,
        phones: [],
        categories: [
          {
            id: 54,
            name: 'category1',
          },
        ],
      }
    ],
  };
}

describe('<Business />', () => {
  it('Renders the name of the Business', () => {
    const organization = mockOrganization();
    const wrapper = shallow(
      <Business
        business={organization}
        key={organization.id}
        handleClickOnBusiness={handleClickOnBusiness}
      />
    );
    expect(wrapper.find('.title').text()).toBe('organization1');
  });

  it('Renders the description of the Organization', () => {
    const organization = mockOrganization();
    const wrapper = shallow(
      <Business
        business={organization}
        key={organization.id}
        handleClickOnBusiness={handleClickOnBusiness}
      />
    );
    expect(wrapper.find('.preview-details').text()).toBe('orgDescription');
  });

  it('Renders a Main Location for an Organization', () => {
    const organization = mockOrganization();
    const wrapper = shallow(
      <Business
        business={organization}
        key={organization.id}
        handleClickOnBusiness={handleClickOnBusiness}
      />
    );
    expect(wrapper.find('.main-location').contains('123 Road St')).toBe(true);
  });

  it('Renders a Main Contact for the Organization', () => {
    const organization = mockOrganization();
    const wrapper = shallow(
      <Business
        business={organization}
        key={organization.id}
        handleClickOnBusiness={handleClickOnBusiness}
      />
    );
    expect(wrapper.find('.main-contact').contains('jondoe@something.org')).toBe(true);
  });

  it('Renders a list of services offered', () => {
    const organization = mockOrganization();
    const wrapper = shallow(
      <Business
        business={organization}
        key={organization.id}
        handleClickOnBusiness={handleClickOnBusiness}
      />
    );
    expect(wrapper.find('.business-service').length).toEqual(2);
  });

  it('Update expand/collapse state when user clicks expand button', () => {
    const organization = mockOrganization();
    const wrapper = shallow(
      <Business
        business={organization}
        key={organization.id}
        handleClickOnBusiness={handleClickOnBusiness}
      />
    );
    wrapper.find('.business-card-icon').simulate('click');
    expect(wrapper.state('expanded')).toEqual(true);
  });
});
