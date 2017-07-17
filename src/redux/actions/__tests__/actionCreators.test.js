import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';

import initState from '../../initialState';

import {
  updateOffice,
  updateZipCode,
  updateLocation,
  setLanguagePreference,
  updateMapLoading,
  populateSNAP,
} from '../actions';

import {
  updateLanguage,
  changeOffice,
  changeZipCode,
  changeLocation,
  updateOffices,
  fetchOffices,
} from '../actionCreators';

describe('async actionCreators', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  const location = {
    latitude: 38.5386881,
    longitude: -122.695547,
    latitudeDelta: 0.4,
    longitudeDelta: 0.4,
  };

  const mockFetchZipCode = () =>
    new Promise(resolve => {
      setTimeout(
        () =>
          resolve('95404'),
        250,
      );
    });

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

  test('updateLanguage emits, dispatches', () => {
    const socket = {
      emit: jest.fn()
    };
    const lang = 'es';
    const expectedActions = [
      setLanguagePreference(lang)
    ];
    const store = mockStore(initState);
    store.dispatch(updateLanguage(socket, lang))
    expect(store.getActions()).toEqual(expectedActions);
    expect(socket.emit).toHaveBeenCalledWith('update-language', {
      lang: 'Spanish'
    });
  });

  test('changeOffice emits, dispatches', () => {
    const socket = {
      emit: jest.fn()
    };
    const office = 1;
    const expectedActions = [
      updateOffice(office)
    ];
    const store = mockStore(initState);
    store.dispatch(changeOffice(socket, office))
    expect(store.getActions()).toEqual(expectedActions);
    expect(socket.emit).toHaveBeenCalledWith('update-office', {
      office: 'SNAP',
      date: moment().format('l')
    });
  });

  test('changeZipCode emits, dispatches', () => {
    const socket = {
      emit: jest.fn()
    };
    const zipCode = '95404';
    const expectedActions = [
      updateZipCode(zipCode)
    ];
    const store = mockStore(initState);
    store.dispatch(changeZipCode(socket, zipCode))
    expect(store.getActions()).toEqual(expectedActions);
    expect(socket.emit).toHaveBeenCalledWith('update-zip', {
      zipCode
    });
  });

  test('changeLocation emits, dispatches', async () => {
    const socket = {
      emit: jest.fn()
    };
    const expectedActions = [
      updateLocation(location)
    ];
    const store = mockStore(initState);
    store.dispatch(changeLocation(socket, location))
    expect(store.getActions()).toEqual(expectedActions);
    const zipCode = await mockFetchZipCode(location)
    expect(socket.emit).toHaveBeenCalledWith('update-zip', {
      zipCode
    });
  });

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
      location
    });
    return store.dispatch(fetchOffices()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('updateOffices dispatches correct actions', async () => {
    const offices = await mockFetchResults();
    const expectedActions = [
      populateSNAP(offices),
      updateMapLoading(false),
    ];
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
