import {BusinessTypes as types} from '../action-types';
import {CategoriesConstants} from '../constants';
import httpRequest from '../utils/httpRequest';
import {browserHistory} from 'react-router';
import queryString from 'query-string';
import {isEmpty, isString, cloneDeep} from 'lodash';

const MaxItemsDisplayedPerPage = 6;
