const initialState = {
  adminBlogs: {
    drafts: {
      data: [],
      noResults: false,
      page: 1,
      totalPages: 0,
    },
    posted: {
      data: [],
      noResults: false,
      page: 1,
      totalPages: 0,
    },
    noResults: false,
    savePost: {
      data: {},
      loading: false,
      errors: {},
    },
    updatePost: {
      data: {},
      loading: false,
      errors: {},
    },
    deletePost: {
      errors: {},
      loading: false,
      success: false,
    },
    hideFooter: false,
  },
  adminProfile: {
    updatedOrganization: {
      data: {},
      loading: false,
      success: false,
      errors: [],
    },
    publishStatus: null,
    publishSuccess: false,
    publishLoading: false,
    publishErrors: [],
  },
  blogs: {
    categories: [],
    category: 'front page',
    categoriesLoading: true,
    featuredPosts: [],
    getFeaturedPostloading: true,
    getPostIdSuccess: false,
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
    events: {
      data: [],
      noResults: false,
      page: 1,
      totalPages: 0,
      errors: {},
      loading: true,
    },
    eventsByMonth: {
      data: [],
      errors: {},
      loading: true,
    },
    featuredEvents: {
      data: [],
      errors: {},
      loading: true,
    },
  },
  locationCreate: {
    error: false,
    errors: [],
    loading: false,
    location: {},
    success: false,
  },
  locations: {
    error: false,
    errors: [],
    loading: true,
    location: {},
    locationByIdSuccess: false,
    locations: [],
    noResults: false,
  },
  getLocationByOrganization: {
    error: false,
    errors: [],
    loading: false,
    locations: [],
    success: false,
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
    loginError: '',
    passwordResetSuccess: false,
    organizationId: 0,
    signOut: {
      errors: {},
      success: false,
      loading: false,
    },
    userInformation: {
      username: '',
      email: '',
    },
    updateInformation: {
      loading: false,
      response: {},
      errorsInfo: [],
      errorsPassword: [],
      errorsDelete: {},
      successInfo: false,
      successPassword: false,
      successDelete: false,
    },
  },
  snackbar: {
    visibility: false,
    message: 'placeholder message',
    autoHideDuration: 10000,
    actionText: 'DISMISS',
  },
  errors: {
    userAuthorized: true,
  },
  validateYup: {
    loading: false,
    success: false,
    error: false,
  },
  serviceCreate: {
    error: false,
    errors: [],
    loading: false,
    locationId: '',
    locationName: '',
    service: {},
    success: false,
  },
  serviceTaxonomy: {
    checkboxes: [],
    error: false,
    errors: [],
    initialForm: {},
    loading: true,
    success: false,
  },
  serviceGet: {
    data: {},
    error: false,
    errors: [],
    loading: true,
    success: false,
  },
  serviceDelete: {
    data: {},
    error: false,
    errors: [],
    loading: false,
    success: false,
  },
  eventsCreate: {
    data: {},
    error: false,
    errors: [],
    loading: false,
    success: false,
  },
  eventsGet: {
    data: {},
    error: false,
    errors: [],
    loading: true,
    success: false,
  },
  eventDelete: {
    data: {},
    error: false,
    errors: [],
    loading: false,
    success: false,
  },
};

export default initialState;
