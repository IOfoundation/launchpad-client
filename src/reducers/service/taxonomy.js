import {ServiceTaxonomyTypes as types} from '../../action-types';

const initialState = {
  checkboxes: [],
  error: false,
  errors: [],
  initialForm: {},
  loading: true,
  success: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_SERVICE_TAXONOMY_START: {
      return {
        checkboxes: [],
        error: false,
        errors: [],
        initialForm: {},
        loading: true,
        success: false,
      };
    }

    case types.GET_SERVICE_TAXONOMY_SUCCESS: {
      const {initialForm, checkboxes} = action;

      return {
        ...state,
        checkboxes,
        initialForm,
        loading: false,
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
