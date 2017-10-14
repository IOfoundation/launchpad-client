const initialState = {
  businesses: {
    organization: {
      id: null,
      name: 'name',
      description: 'description',
      location: {},},
    locations: [],
    organizations: [],
    items: [],
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
