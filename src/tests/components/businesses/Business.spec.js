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
    console.log(wrapper.contains('.title'));
    expect(wrapper.find('.title').text()).to.be.deep.equal('organization1');
    expect(wrapper.find('.preview-details').text()).to.be.deep.equal(
      'orgDescription'
    );
    expect(wrapper.find('.main-location').contains('123 Road St')).to.be(true);
    expect(wrapper.find('.main-contact').contains('jondoe@test.org')).to.be(
      true
    );
    //expect(wrapper.find('.business-service').length).to.equal(2);
    wrapper.find('.business-card-icon').simulate('click');
    expect(wrapper.state('expanded')).to.equal(true);
  });
});
