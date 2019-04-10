import {AdminProfileTypes as types} from '../action-types';

const initialState = {
  updatedOrganization: {
    data: [],
    loading: false,
  },
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

    default:
      return state;
  }
}
