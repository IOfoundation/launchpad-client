import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import ProfileForm from '../../../../components/admin-site/elements/ProfileForm';

const props = {
  errors: {},
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  touched: {},
  values: {
    password: '',
    contactEmail: '',
    organizationName: '',
    name: '',
    website: '',
    description: '',
    accreditations: '',
    dateIncorporation: '',
    legalStatus: '',
    fundingSources: '',
    licenses: '',
    taxIdentifier: '',
    taxStatus: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    phones: [
      {
        phoneNumber: '',
        ext: '',
        vanityNumber: '',
        numberType: '',
        department: '',
        countryExt: '',
      },
    ],
  },
};

describe('Admin-site <ProfileForm />', () => {
  it('renders snapshot of ProfileForm', () => {
    const wrapper = mount(<ProfileForm {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
