import nock from 'nock';
import * as actions from 'actions/business';
import {BusinessTypes as types} from 'action-types';

describe('filterOrganizations', () => {
  beforeEach(() => {
    nock('http://localhost:8080/api')
      .get('/api/organizations')
      .reply(200);
  });
  afterAll(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
  test('should call FETCH_ORGANIZATIONS_REQUEST', async () => {
    try {
      const dispatch = jest.fn();
      const expected_call = [{type: types.FETCH_ORGANIZATIONS_REQUEST}];
      await actions.filterOrganizations()(dispatch);
      expect(dispatch.mock.calls.length).toEqual(2);
      expect(dispatch.mock.calls[0]).toEqual(expected_call);
    } catch (error) {
      throw error;
    }
  });
});
