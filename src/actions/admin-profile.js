import {AdminProfileTypes as types} from '../action-types';
import {httpRequest} from '@Utils';

const updateCompanyStart = () => {
  return {
    type: types.UPDATE_COMPANY_START,
  };
};

const updateCompanySuccess = organization => {
  return {
    type: types.UPDATE_COMPANY_SUCCESS,
    organization,
  };
};

const updateCompanyFail = errors => {
  return {
    type: types.UPDATE_COMPANY_FAIL,
    errors,
  };
};

export const updateCompany = ({organization, id, auth}) => {
  return async dispatch => {
    try {
      const config = {
        headers: {Authorization: auth},
      };
      dispatch(updateCompanyStart());
      const httpResponse = await httpRequest.put(
        `/api/organizations/${id}`,
        {
          organization,
        },
        config
      );
      dispatch(updateCompanySuccess(httpResponse.data));
    } catch (errors) {
      dispatch(updateCompanyFail(errors));
    }
  };
};
