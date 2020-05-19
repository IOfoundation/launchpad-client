import {ServiceTaxonomyTypes as types} from '../../action-types';
import {httpRequest} from '@Utils';

const getServiceTaxonomyStart = () => {
  return {
    type: types.GET_SERVICE_TAXONOMY_START,
  };
};

const getServiceTaxonomySuccess = ({initialForm, checkboxes}) => {
  return {
    type: types.GET_SERVICE_TAXONOMY_SUCCESS,
    initialForm,
    checkboxes,
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

      dispatch(
        getServiceTaxonomySuccess({
          initialForm: taxonomyToForm(httpResponse.data),
          checkboxes: taxonomyToCheckbox(httpResponse.data),
        })
      );
    } catch (errors) {
      if (errors.data && errors.data.errors) {
        dispatch(getServiceTaxonomyError(errors.data.errors));
      } else {
        dispatch(getServiceTaxonomyError(errors.data));
      }
    }
  };
};

const taxonomyToCheckbox = taxonomies => {
  return taxonomies.map(taxonomy => {
    const half = Math.ceil(taxonomy.children.length / 2);
    const left = taxonomy.children.slice(0, half);
    const rigth = taxonomy.children.slice(half, taxonomy.children.length);

    const leftColumn = left.map(_taxonomy => {
      return {
        key: _taxonomy.taxonomy_id,
        label: _taxonomy.name,
      };
    });
    const rightColumn = rigth.map(_taxonomy => {
      return {
        key: _taxonomy.taxonomy_id,
        label: _taxonomy.name,
      };
    });

    return {leftColumn, rightColumn, id: taxonomy.id, name: taxonomy.name};
  });
};

const taxonomyToForm = taxonomies => {
  return taxonomies.reduce((acc, taxonomy) => {
    acc[taxonomy.id] = taxonomy.children.reduce((a, prop) => {
      a[prop.taxonomy_id] = false;

      return a;
    }, {});

    return acc;
  }, {});
};
