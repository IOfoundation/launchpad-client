import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Business from '../../../components/businesses/Business';
import organizationFixture from '../../fixtures/organization';

describe('<Business />', () => {
  it('renders attributes of organization', () => {
    const wrapper = shallow(
      <Business
        isSelected={false}
        business={organizationFixture}
        isMobile={false}
        key={organizationFixture.id}
        expanded={true}
      />
    );
    expect(wrapper.find('h3.title').text()).to.be.deep.equal(
      organizationFixture.name
    );
    expect(wrapper.find('.business-description').text()).to.be.deep.equal(
      organizationFixture.description
    );
    expect(wrapper.find('.main-location').exists()).to.be.deep.equal(true);
    expect(wrapper.find('.main-contact').exists()).to.be.deep.equal(true);
    expect(wrapper.find('.business-service')).to.have.lengthOf(2);
  });
});
