import {AdminProfileTypes as types} from '../action-types';
import {httpRequest} from '@Utils';
import {fetchOrganizationByIdSuccessObject} from './business';

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

export const updateCompany = ({organization, organizationId, auth}) => {
  return async dispatch => {
    try {
      const config = {
        headers: {Authorization: auth},
      };
      dispatch(updateCompanyStart());
      const httpResponse = await httpRequest.put(
        `/api/organizations/${organizationId}`,
        {
          organization,
        },
        config
      );
      dispatch(updateCompanySuccess(httpResponse.data[0]));
    } catch (errors) {
      dispatch(updateCompanyFail(errors.data.errors));
    }
  };
};

const updatePublishStatusStart = () => {
  return {
    type: types.UPDATE_PUBLISH_STATUS_START,
  };
};

const updatePublishStatusSuccess = publishStatus => {
  return {
    type: types.UPDATE_PUBLISH_STATUS_SUCCESS,
    publishStatus,
  };
};

const updatePublishStatusFail = errors => {
  return {
    type: types.UPDATE_PUBLISH_STATUS_FAIL,
    errors,
  };
};

export const updatePublishStatus = ({publishStatus, organizationId, auth}) => {
  return async dispatch => {
    try {
      const config = {
        headers: {Authorization: auth},
      };

      dispatch(updatePublishStatusStart());
      const httpResponse = await httpRequest.patch(
        `api/organizations/${organizationId}?organization[is_published]=${publishStatus}`,
        null,
        config
      );

      dispatch(updatePublishStatusSuccess(httpResponse.data[0].is_published));
      dispatch(fetchOrganizationByIdSuccessObject(httpResponse.data[0]));
    } catch (errors) {
      dispatch(updatePublishStatusFail(errors.data.errors));
    }
  };
};
