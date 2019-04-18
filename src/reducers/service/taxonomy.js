import {ServiceTaxonomyTypes as types} from '../../action-types';

const initialState = {
  error: false,
  errors: [],
  loading: false,
  data: [],
  success: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_SERVICE_TAXONOMY_START: {
      return {
        error: false,
        errors: [],
        loading: true,
        data: [],
        success: false,
      };
    }

    case types.GET_SERVICE_TAXONOMY_SUCCESS: {
      const {data} = action;

      return {
        ...state,
        loading: false,
        data,
        success: true,
      };
    }

    case types.GET_SERVICE_TAXONOMY_ERROR: {
      const {errors} = action;
      return {
        ...state,
        error: true,
        errors,
        loading: false,
      };
    }

    default:
      return state;
  }
}
