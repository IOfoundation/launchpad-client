const initialState = {
  businesses: {
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
    displayOptions: {
      showBusinessTypes: true,
      locationToggleSwitch: false,
    },
    appliedFilters: {
      category: null,
    },
  },
};

export default initialState;
