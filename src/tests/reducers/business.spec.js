import BusinessReducer from '../../reducers/businesses';
import deepFreeze from 'deep-freeze';

describe('DEFAULT', () => {
  let _default;
  let initialState;
  let businesses;

  beforeEach(() => {
    initialState = {businesses: []};
    businesses = [
      {
        id: 1,
        name: 'Business 1'
      },
      {
        id: 2,
        name: 'Business 2'
      }
    ]

    _default = {
      businesses
    }
  });

  it('Return the original state', () => {
    deepFreeze(initialState);
    expect(BusinessReducer(initialState, _default).businesses).toEqual([]);
  });

});

describe('FETCH_BUSINESSESS', () => {
  let fetchBusinesses;
  let initialState;
  let businesses;

  beforeEach(() => {
    initialState = {businesses: []};
    businesses = [
      {
        id: 1,
        name: 'Business 1'
      },
      {
        id: 2,
        name: 'Business 2'
      }
    ]

    fetchBusinesses = {
      type: 'FETCH_BUSINESSESS',
      businesses
    }
  });

  it('Return the state with the list of the services', () => {
    deepFreeze(initialState);
    expect(BusinessReducer(initialState, fetchBusinesses).businesses).toEqual(businesses);
  });

});
