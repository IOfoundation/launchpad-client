const initialState = {
  blogs: {
    categories: [],
    category: 'front page',
    featuredPosts: [],
    noResults: false,
    organizationPosts: [],
    page: 1,
    post: {},
    posts: [],
    totalPages: 0,
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
    eventsByMonth: [],
    featuredEvents: [],
  },
  user: {
    loading: false,
    authorization: '',
    error: false,
    emailReset: '',
    signUpSuccessfully: false,
    singUpErrors: {
      model: '',
      errors: {},
    },
  },
  snackbar: {
    visibility: false,
    message: 'placeholder message',
    autoHideDuration: 10000,
    actionText: 'DISMISS',
  },
};

export default initialState;
