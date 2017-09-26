const initialState = {
  home: {
    services: [],
  },
  businesses: {
    business: {
      id: 'id',
      name: 'name',
      description: 'description',
      location: {},
    },
    businesses: [],
    metadata: {
      pagination: {},
    },
    filters: {
      communities: [],
      stages: [],
      offers: [],
      businessTypes: [],
      industries: [],
    },
  },
};

export default initialState;
