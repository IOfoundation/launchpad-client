import {AdminProfileTypes as types} from '../action-types';
import {httpRequest, imageRequest, verifyUnauthorizedErrors} from '@Utils';
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
      dispatch(updateCompanyStart());
      const {image, ...org} = organization;
      const config = {
        headers: {Authorization: auth},
      };
      const formData = new FormData();
      let httpResponse;

      formData.append('image', image);
      formData.append('organization_id', organizationId);

      if (image) {
        const imageHttpResponse = await imageRequest.post(
          '/api/org_profile_images',
          formData,
          config
        );
        httpResponse = await httpRequest.put(
          `/api/organizations/${organizationId}`,
          {
            organization: {
              ...org,
              logo_url: imageHttpResponse.data.url,
            },
          },
          config
        );
      } else {
        httpResponse = await httpRequest.put(
          `/api/organizations/${organizationId}`,
          {
            organization: {
              ...org,
            },
          },
          config
        );
      }

      dispatch(updateCompanySuccess(httpResponse.data[0]));
    } catch (errors) {
      verifyUnauthorizedErrors(dispatch, errors);

      if (errors.status !== 404) {
        dispatch(updateCompanyFail(errors.data.errors));
      }
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
      verifyUnauthorizedErrors(dispatch, errors);
      dispatch(updatePublishStatusFail(errors.data.errors));
    }
  };
};
