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
    featuredPosts: [],
    noResults: false,
    organizationPosts: [],
    page: 1,
    post: {},
    getPostIdSuccess: false,
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
    },
    eventsByMonth: {
      data: [],
      errors: {},
      loading: false,
    },
    featuredEvents: {
      data: [],
      errors: {},
      loading: false,
    },
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
      data: {},
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
};

export default initialState;
