import {AdminBlogsTypes as types} from '../action-types';
import {
  httpRequest,
  verifyUnauthorizedErrors,
  createUrlWithParams,
} from '@Utils';

const getAdminPostsStarts = () => {
  return {
    type: types.GET_ADMIN_POSTS_START,
  };
};

const getAdminDraftPostsSuccess = (drafts, totalPages, page) => {
  return {
    type: types.GET_ADMIN_DRAFTS_POSTS_SUCCESS,
    drafts,
    totalPages,
    page,
  };
};

const getAdminPostedPostsSuccess = (posted, totalPages, page) => {
  return {
    type: types.GET_ADMIN_POSTED_POSTS_SUCCESS,
    posted,
    totalPages,
    page,
  };
};

const getAdminPostsError = error => {
  return {
    type: types.GET_ADMIN_POSTS_FAIL,
    error,
  };
};

export const getAdminPost = (page, type = 'drafts', organizationId) => {
  return async dispatch => {
    try {
      let httpResponse;
      const typeNormalized = type.toLocaleLowerCase();

      dispatch(getAdminPostsStarts());

      if (typeNormalized === 'drafts') {
        httpResponse = await httpRequest.get(
          createUrlWithParams('/api/blog_posts', {
            page,
            per_page: 5,
            'filter[draft]': true,
            'filter[organization_id]': organizationId,
            ignore_org_publish: true,
          })
        );
      } else if (typeNormalized === 'posted') {
        httpResponse = await httpRequest.get(
          createUrlWithParams('/api/blog_posts', {
            page,
            per_page: 5,
            'filter[draft]': false,
            'filter[organization_id]': organizationId,
            ignore_org_publish: true,
          })
        );
      }
      const totalPages =
        parseInt(httpResponse.headers['x-total-count'], 10) / 5;

      if (httpResponse.data.length === 0) {
        dispatch(noResults(true));
      }

      if (typeNormalized === 'drafts') {
        dispatch(
          getAdminDraftPostsSuccess(httpResponse.data, totalPages, page)
        );
      } else if (typeNormalized === 'posted') {
        dispatch(
          getAdminPostedPostsSuccess(httpResponse.data, totalPages, page)
        );
      }
    } catch (errors) {
      verifyUnauthorizedErrors(dispatch, errors);
      dispatch(getAdminPostsError(errors));
    }
  };
};

export const noResults = value => {
  return {
    type: types.NO_RESULTS,
    noResults: value,
  };
};

export const hideFooter = hide => {
  return {
    type: types.HIDE_FOOTER,
    hideFooter: hide,
  };
};

const savePostStart = () => {
  return {
    type: types.SAVE_POSTS_START,
  };
};

const savePostSuccess = post => {
  return {
    type: types.SAVE_POSTS_SUCCESS,
    post,
  };
};

const savePostFail = errors => {
  return {
    type: types.SAVE_POSTS_FAIL,
    errors,
  };
};

export const savePost = ({title, body, category, auth, published}) => {
  return async dispatch => {
    try {
      const config = {
        headers: {Authorization: auth},
      };
      dispatch(savePostStart());
      const httpResponse = await httpRequest.post(
        '/api/blog_posts',
        {
          blog_post: {title, body, category, is_published: published},
        },
        config
      );
      dispatch(savePostSuccess(httpResponse.data));
    } catch (errors) {
      verifyUnauthorizedErrors(dispatch, errors);
      dispatch(savePostFail(errors));
    }
  };
};

const deletePostStarts = () => {
  return {
    type: types.DELETE_POST_START,
  };
};

const deletePostSuccess = data => {
  return {
    type: types.DELETE_POST_SUCCESS,
    data,
  };
};

const deletePostError = error => {
  return {
    type: types.DELETE_POST_FAIL,
    error,
  };
};

export const deletePost = ({id, auth}) => {
  return async dispatch => {
    try {
      const config = {
        headers: {Authorization: auth},
      };
      dispatch(deletePostStarts());
      const httpResponse = await httpRequest.delete(
        `/api/blog_posts/${id}`,
        config
      );
      dispatch(deletePostSuccess(httpResponse.data));
    } catch (errors) {
      verifyUnauthorizedErrors(dispatch, errors);
      dispatch(deletePostError(errors));
    }
  };
};

const updatePostStart = () => {
  return {
    type: types.UPDATE_POSTS_START,
  };
};

const updatePostSuccess = post => {
  return {
    type: types.UPDATE_POSTS_SUCCESS,
    post,
  };
};

const updatePostFail = errors => {
  return {
    type: types.UPDATE_POSTS_FAIL,
    errors,
  };
};

export const updatePost = ({id, title, body, category, auth, published}) => {
  return async dispatch => {
    try {
      const config = {
        headers: {Authorization: auth},
      };
      dispatch(updatePostStart());
      const httpResponse = await httpRequest.put(
        `/api/blog_posts/${id}`,
        {
          blog_post: {title, body, category, is_published: published},
        },
        config
      );
      dispatch(updatePostSuccess(httpResponse.data));
    } catch (errors) {
      verifyUnauthorizedErrors(dispatch, errors);
      dispatch(updatePostFail(errors));
    }
  };
};
