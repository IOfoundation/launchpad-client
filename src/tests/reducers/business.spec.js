import BusinessReducer from '../../reducers/businesses';
import deepFreeze from 'deep-freeze';

describe('BusinessReducer', () => {
  it('must be defined', () => {
    expect(BusinessReducer).toBeDefined();
  });
});

describe('DEFAULT', () => {
  let _default;
  let initialState;
  let businesses;

  beforeEach(() => {
    initialState = {businesses: []};
    businesses = [
      {
        id: 1,
        name: 'Business 1',
      },
      {
        id: 2,
        name: 'Business 2',
      },
    ];

    _default = {
      businesses,
    };
  });

  it('Return the original state', () => {
    deepFreeze(initialState);
    expect(BusinessReducer(initialState, _default).businesses).toEqual([]);
  });
});

describe('FETCH_BUSINESS', () => {
  let fetchBusiness;
  let initialState;
  let business;

  beforeEach(() => {
    initialState = {business: []};
    business = {
      id: 1,
      name: 'Business 1',
    };

    fetchBusiness = {
      type: 'FETCH_BUSINESS',
      business,
    };
  });

  it('Return the state with the list of the services', () => {
    deepFreeze(initialState);
    expect(BusinessReducer(initialState, fetchBusiness).business).toEqual(
      business
    );
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
        name: 'Business 1',
      },
      {
        id: 2,
        name: 'Business 2',
      },
    ];

    fetchBusinesses = {
      type: 'FETCH_BUSINESSESS',
      businesses,
    };
  });

  it('Return the state with the list of the services', () => {
    deepFreeze(initialState);
    expect(BusinessReducer(initialState, fetchBusinesses).businesses).toEqual(
      businesses
    );
  });
});

describe('FETCH_BUSINESSES_METADATA', () => {
  let fetchMetadata;
  let initialState;
  let metadata;

  beforeEach(() => {
    initialState = {metadata: {}};
    metadata = {
      totalBusinesses: 10,
      pagination: {},
    };

    fetchMetadata = {
      type: 'FETCH_BUSINESSES_METADATA',
      metadata,
    };
  });

  it('Return the state with the list of the services', () => {
    deepFreeze(initialState);
    expect(BusinessReducer(initialState, fetchMetadata).metadata).toEqual(
      metadata
    );
  });
});

describe('FETCH_FILTERS_OPTIONS', () => {
  let fetchFilters;
  let initialState;
  let filters;

  beforeEach(() => {
    initialState = {filters: {}};
    filters = {
      communities: [],
    };

    fetchFilters = {
      type: 'FETCH_FILTERS_OPTIONS',
      filters,
    };
  });

  it('Return the state with the list of the services', () => {
    deepFreeze(initialState);
    expect(BusinessReducer(initialState, fetchFilters).filters).toEqual(
      filters
    );
  });
});
