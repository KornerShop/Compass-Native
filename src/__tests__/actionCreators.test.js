import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import initState from '../redux/initialState';

import {
  updateMapLoading,
  updateLocation,
  populateSNAP,
} from '../redux/actions/actions';

import {
  updateOffices,
  fetchOffices,
} from '../redux/actions/actionCreators';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const mockFetchZipCodeCoords = () =>
  new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          lat: 38.5386881,
          lng: -122.695547,
        }),
      250,
    );
  });

const mockFetchResults = () =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve([
          {
            address: '2550 Paulin Dr # 1, Santa Rosa, CA 95403, USA',
            id: 'ChIJWcnjX3c4hIAReEaEIu-h5Dg',
            lat: 38.464769,
            lng: -122.721573,
            name: 'Sonoma County Human Services Department',
            phone_intl: '+1 877-699-6868',
            phone_local: '(877) 699-6868',
          },
          {
            address: '520 Mendocino Ave, Santa Rosa, CA 95402, USA',
            id: 'ChIJ2S8f1PhHhIARUVCsEnyrOEw',
            lat: 38.443262,
            lng: -122.715587,
            name: 'Sonoma County Economic Assistance 2',
            phone_intl: '+1 877-699-6868',
            phone_local: '(877) 699-6868',
          },
        ]),
      250,
    ),
  );

describe('async actions', () => {
  test('fetchOffices dispatches correct actions w/ zip', async () => {
    const {
      lat: latitude,
      lng: longitude,
    } = await mockFetchZipCodeCoords();
    const expectedActions = [
      updateMapLoading(true),
      updateLocation({ latitude, longitude }),
    ];
    const store = mockStore({
      ...initState,
      office: 1,
      zipCode: '95404',
    });
    return store.dispatch(fetchOffices(true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('fetchOffices dispatches correct actions w/ device location', async () => {
    const expectedActions = [
      updateMapLoading(true),
      updateLocation({
        latitude: 38.5386881,
        longitude: -122.695547,
      }),
    ];
    const store = mockStore({
      ...initState,
      office: 1,
      location: {
        latitude: 38.5386881,
        longitude: -122.695547,
        latitudeDelta: 0.4,
        longitudeDelta: 0.4,
      },
    });
    return store.dispatch(fetchOffices()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('updateOffices dispatches correct actions', async () => {
    const offices = await mockFetchResults();
    const expectedActions = [populateSNAP(offices), updateMapLoading(false)];
    const store = mockStore({
      ...initState,
      mapLoading: true,
    });
    return updateOffices(
      store.dispatch,
      1,
      38.5386881,
      -122.695547,
    ).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
