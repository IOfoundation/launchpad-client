import HomeReducer from '../../reducers/home';
import deepFreeze from 'deep-freeze';

describe('DEFAULT', () => {
  let _default;
  let initialState;
  let services;

  beforeEach(() => {
    initialState = {services: []};
    services = [
      {
        id: 1,
        name: 'Service 1'
      },
      {
        id: 2,
        name: 'Service 2'
      }
    ]

    _default = {
      services
    }
  });

  it('Return the original state', () => {
    deepFreeze(initialState);
    expect(HomeReducer(initialState, _default).services).toEqual([]);
  });

});

describe('FETCH_SERVICES', () => {
  let fetchServices;
  let initialState;
  let services;

  beforeEach(() => {
    initialState = {services: []};
    services = [
      {
        id: 1,
        name: 'Service 1'
      },
      {
        id: 2,
        name: 'Service 2'
      }
    ]

    fetchServices = {
      type: 'FETCH_SERVICES',
      services
    }
  });

  it('Return the state with the list of the services', () => {
    deepFreeze(initialState);
    expect(HomeReducer(initialState, fetchServices).services).toEqual(services);
  });

});
