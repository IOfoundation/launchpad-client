import {ServiceTaxonomyTypes as types} from '../../action-types';
import {httpRequest} from '@Utils';

const getServiceTaxonomyStart = () => {
  return {
    type: types.GET_SERVICE_TAXONOMY_START,
  };
};

const getServiceTaxonomySuccess = data => {
  return {
    type: types.GET_SERVICE_TAXONOMY_SUCCESS,
    data,
  };
};

const getServiceTaxonomyError = errors => {
  return {
    type: types.GET_SERVICE_TAXONOMY_ERROR,
    errors,
  };
};

export const getTaxonomy = () => {
  return async dispatch => {
    try {
      dispatch(getServiceTaxonomyStart());
      const httpResponse = await httpRequest.get('/api/categories');

      dispatch(getServiceTaxonomySuccess(httpResponse.data));
    } catch (errors) {
      if (errors.data && errors.data.errors) {
        dispatch(getServiceTaxonomyError(errors.data.errors));
      } else {
        dispatch(getServiceTaxonomyError(errors.data));
      }
    }
  };
};
