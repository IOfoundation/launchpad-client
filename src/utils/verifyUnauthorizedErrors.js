import * as errorsActions from '@Actions/errors';

const verifyError = errors => {
  return status => errors.status === status;
};

export const verifyUnauthorizedErrors = (dispatch, errors) => {
  const is = verifyError(errors);

  if (is(401) || is(403)) {
    dispatch(errorsActions.userUnauthorized());
  }
};
