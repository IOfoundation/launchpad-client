import {ValidateYupTypes as types} from '../action-types';

const validateRequest = config => {
  return {
    type: types.VALIDATE_REQUEST,
    ...config,
  };
};

const validateSuccess = () => {
  return {
    type: types.VALIDATE_SUCCESS,
  };
};

const validateError = () => {
  return {
    type: types.VALIDATE_FAIL,
  };
};

export const validateSchema = (schema, data) => {
  return async dispatch => {
    try {
      dispatch(validateRequest());
      await schema.validate(data);
      dispatch(validateSuccess());
    } catch (error) {
      dispatch(validateError());
    }
  };
};
