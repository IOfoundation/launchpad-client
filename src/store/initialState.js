const initialState = {
  businesses: {
    locations: [],
    organization: {},
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
  snackbar: {
    visibility: false,
    message: 'placeholder message',
    autoHideDuration: 10000,
    actionText: 'DISMISS',
  },
  events: {
    data: [],
  },
};

export default initialState;
