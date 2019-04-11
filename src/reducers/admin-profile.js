import {AdminProfileTypes as types} from '../action-types';

const initialState = {
  updatedOrganization: {
    data: [],
    loading: false,
    success: false,
    errors: [],
  },
  publishStatus: null,
  publishSuccess: false,
  publishLoading: false,
  publishErrors: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_COMPANY_START: {
      return {
        ...state,
        updatedOrganization: {
          data: [],
          noResults: false,
          loading: true,
          success: false,
          errors: [],
        },
      };
    }

    case types.UPDATE_COMPANY_SUCCESS: {
      const {organization} = action;
      return {
        ...state,
        updatedOrganization: {
          ...state.updatedOrganization,
          data: organization,
          loading: false,
          success: true,
        },
      };
    }

    case types.UPDATE_COMPANY_FAIL: {
      const {errors} = action;
      return {
        ...state,
        updatedOrganization: {
          ...state.updatedOrganization,
          errors,
          loading: false,
        },
      };
    }

    case types.UPDATE_PUBLISH_STATUS_START: {
      return {
        ...state,
        publishStatus: null,
        publishSuccess: false,
        publishLoading: true,
        publishErrors: [],
        updatedOrganization: {
          ...state.updatedOrganization,
        },
      };
    }

    case types.UPDATE_PUBLISH_STATUS_SUCCESS: {
      const {publishStatus} = action;
      return {
        ...state,
        publishStatus,
        publishSuccess: true,
        publishLoading: false,
        updatedOrganization: {
          ...state.updatedOrganization,
        },
      };
    }

    case types.UPDATE_PUBLISH_STATUS_FAIL: {
      const {errors} = action;
      return {
        ...state,
        publishSuccess: false,
        publishLoading: true,
        publishErrors: errors,
        updatedOrganization: {
          ...state.updatedOrganization,
        },
      };
    }

    default:
      return state;
  }
}
