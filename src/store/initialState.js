const initialState = {
  home: {
    services: [],
  },
  businesses: {
    business: {
      id: 'id',
      name: 'name',
      description: 'description',

      // categories: [
      //   {name: 'BusinessType', children: []},
      //   {name: 'Community', children: []},
      //   {name: 'Stage', children: []},
      // ],
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
