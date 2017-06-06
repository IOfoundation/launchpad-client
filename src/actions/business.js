import {BusinessTypes as types} from '../action-types';
import httpRequest from '../services/httpRequest';
import { browserHistory } from 'react-router'

const businessesDataObject = businesses => {
  return {
    type: types.FETCH_BUSINESSESS,
    businesses,
  };
};

export function fetchBusinesses(filters) {
  return async (dispatch: Function) => {
    const httpResponse = await httpRequest.get('/businesses', {
      params: filters
    });
    const {businesses} = httpResponse.data;
    dispatch(businessesDataObject(businesses));
  };
}
