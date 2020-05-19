import nock from 'nock';
import * as actions from '@Actions/business';
import {BusinessTypes as types} from 'action-types';

describe.skip('filterOrganizations', () => {
  beforeEach(() => {
    nock('http://localhost:8080/api')
      .get('/api/organizations')
      .reply(200);
  });
  test('should call FETCH_ORGANIZATIONS_REQUEST', async () => {
    try {
      const dispatch = jest.fn();
      const expected_call = [{type: types.FETCH_ORGANIZATIONS_REQUEST}];
      await actions.filterOrganizations('category', {
        category: 'Legal Services',
        page: 1,
      })(dispatch);
      expect(dispatch.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0]).toEqual(expected_call);
    } catch (error) {
      throw error;
    }
  });
});
