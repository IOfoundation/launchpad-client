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
    locations: [],
    organizations: [],
    metadata: {
      pagination: {},
    },
    filters: {
      businessServices: [],
      communities: [],
      stages: [],
      businessTypes: [],
      industries: [],
    },
  },
};

export default initialState;
