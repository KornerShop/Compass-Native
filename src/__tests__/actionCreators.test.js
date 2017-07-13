import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import initState from '../redux/initialState';

import {
  updateMapLoading,
  updateLocation,
} from '../redux/actions/actions';

import {
  updateOffices,
  fetchOffices,
} from '../redux/actions/actionCreators';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const mockFetchZipCodeCoords = () => new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          lat: 38.5386881,
          lng: -122.695547,
        }),
      250,
    );
  });

describe('async actions', () => {
  test('fetchOffices dispatches correct actions', async () => {
    const {
      lat: latitude,
      lng: longitude,
    } = await mockFetchZipCodeCoords();
    const expectedActions = [
      updateMapLoading(true),
      updateLocation({ latitude, longitude }),
    ];
    const store = mockStore({ ...initState, office: 1 });
    const dispatchMock = jest.fn();
    const updateOfficeMock = jest.fn();
    return store.dispatch(fetchOffices(true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(updateOfficeMock).toHaveBeenCalledWith(
        dispatchMock,
        1,
        latitude,
        longitude,
      );
    });
  });
});
