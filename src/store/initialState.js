const initialState = {
  home: {
    services: [],
  },
  businesses: {
    organization: {
      id: 'id',
      name: 'name',
      description: 'description',
      location: {},
    },
    locations: [],
    organizations: [],
    metadata: {
      pagination: {
        last: {
          page: null,
          per_page: null,
        },
        next: null,
      },
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
