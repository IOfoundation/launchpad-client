import {GetLocationByOrganizationTypes as types} from '../../action-types';
import {httpRequest, verifyUnauthorizedErrors} from '@Utils';

const getLocationByOrganizationStart = () => {
  return {
    type: types.GET_LOCATION_BY_ORGANIZATION_START,
  };
};

const getLocationByOrganizationSuccess = locations => {
  return {
    type: types.GET_LOCATION_BY_ORGANIZATION_SUCCESS,
    locations,
  };
};

const getLocationByOrganizationError = errors => {
  return {
    type: types.GET_LOCATION_BY_ORGANIZATION_ERROR,
    errors,
  };
};

export const getLocationByOrganization = ({Authorization, organizationId}) => {
  return async dispatch => {
    try {
      dispatch(getLocationByOrganizationStart());
      const config = {
        headers: {Authorization},
      };
      const httpResponse = await httpRequest.get(
        `/api/organizations/${organizationId}/locations`,
        config
      );

      const data = httpResponse.data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      dispatch(getLocationByOrganizationSuccess(data));
    } catch (errors) {
      verifyUnauthorizedErrors(dispatch, errors);
      dispatch(getLocationByOrganizationError(errors.data));
    }
  };
};

export const setLoading = loading => {
  return {
    type: types.SET_LOADING,
    loading,
  };
};
