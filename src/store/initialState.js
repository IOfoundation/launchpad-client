const initialState = {
  blogs: {
    noResults: false,
    featuredPosts: [],
    organizationPosts: [],
  },
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
  events: {
    data: [],
    featuredEvents: [],
  },
  user: {
    loading: false,
    authorization: '',
    error: false,
    emailReset: '',
    signUpSuccessfully: false,
    singUpErros: [],
  },
  snackbar: {
    visibility: false,
    message: 'placeholder message',
    autoHideDuration: 10000,
    actionText: 'DISMISS',
  },
};

export default initialState;
