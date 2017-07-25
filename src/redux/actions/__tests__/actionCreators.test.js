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
  populateWIC,
  populateWICVendors,
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

  const zipCode = 95404;

  const zipCodeCoords = {
    lat: 38.5386881,
    lng: -122.695547,
  };

  const snapOffices = [
    {
      address: '2550 Paulin Dr # 1, Santa Rosa, CA 95403, USA',
      id: 'ChIJWcnjX3c4hIAReEaEIu-h5Dg',
      lat: 38.464769,
      lng: -122.721573,

      name: 'Sonoma County Human Services Department',
      phone_intl: '+1 877-699-6868',
      phone_local: '(877) 699-6868',
    },
  ];

  const wicOffices = [
    {
      address: '1450 Guerneville Rd, Santa Rosa, CA 95403, USA',
      id: 'ChIJmWPLhYw4hIARhkTo_qBYWnE',
      lat: 38.45666319999999,
      lng: -122.7343426,
      name: 'WIC',
      phone_intl: '+1 707-565-6590',
      phone_local: '(707) 565-6590',
    },
    {
      address: '355 Tuolumne St, Vallejo, CA 94590, USA',
      id: 'ChIJV8qY6w1zhYARuBchWPvtlFU',
      lat: 38.1032892,
      lng: -122.2389585,
      name: 'Solano County WIC Program',
      phone_intl: '+1 707-553-5381',
      phone_local: '(707) 553-5381',
    },
    {
      address: '2751 Napa Valley Corporate Dr, Napa, CA 94558, USA',
      id: 'ChIJ9aJDDEYGhYARxsRkUv2iQPk',
      lat: 38.249683,
      lng: -122.27593,
      name: 'WIC',
      phone_intl: '+1 707-253-4853',
      phone_local: '(707) 253-4853',
    },
    {
      address:
        'Suite 4, 14085 Lakeshore Dr, Clearlake, CA 95422, USA',
      id: 'ChIJdYrbm8eLg4ARbJp5ZzRVBDA',
      lat: 38.95860439999999,
      lng: -122.6493012,
      name: 'Women Infant & Children',
      phone_intl: '+1 707-994-1151',
      phone_local: '(707) 994-1151',
    },
    {
      address: '11 English St, Petaluma, CA 94952, USA',
      id: 'ChIJ697sM6e2hYARGih3Xt7SAAE',
      lat: 38.2319379,
      lng: -122.6442755,
      name: 'WIC Petaluma',
      phone_intl: '+1 800-816-3663',
      phone_local: '(800) 816-3663',
    },
    {
      address: '1530 Solano Ave, Vallejo, CA 94590, USA',
      id: 'ChIJD2NWug1zhYARmELjE9P_loU',
      lat: 38.1016731,
      lng: -122.2390356,
      name: 'Prime Time Nutrition',
      phone_intl: '+1 707-644-6600',
      phone_local: '(707) 644-6600',
    },
    {
      address: '8465 Old Redwood Hwy #320, Windsor, CA 95492, USA',
      id: 'ChIJ24DSyww-hIAROpzUsj2K5Zs',
      lat: 38.5431579,
      lng: -122.8017116,
      name: 'Alliance Medical Center',
      phone_intl: '+1 707-433-5494',
      phone_local: '(707) 433-5494',
    },
    {
      address: '210 Hospital Dr, Vallejo, CA 94589, USA',
      id: 'ChIJy1-q0DRzhYARuIqXldjxVYw',
      lat: 38.13150350000001,
      lng: -122.2387657,
      name: 'La Clinica Vallejo Great Begin',
      phone_intl: '+1 707-645-7316',
      phone_local: '(707) 645-7316',
    },
  ];

  const vendors = [
    {
      id: 'ChIJZ1aAHdxHhIARO2o8VNCrzvo',
      name: 'Safeway #1562',
      address: '2751 4th St, Santa Rosa, CA,  95404, USA',
      lat: 38.450691,
      lng: -122.69104,
    },
    {
      id: 'ChIJD2VCHBhIhIAR-pleXyzr54s',
      name: "Lola's Market",
      address: '1680 Petaluma Hill Rd, Santa Rosa, CA,  95404, USA',
      lat: 38.42281,
      lng: -122.70693,
    },
  ];

  const mockFetchZipCode = () =>
    new Promise(resolve => {
      setTimeout(() => resolve('95404'), 250);
    });

  test('updateLanguage emits, dispatches', () => {
    const socket = {
      emit: jest.fn(),
    };
    const lang = 'es';
    const expectedActions = [setLanguagePreference(lang)];
    const store = mockStore(initState);
    store.dispatch(updateLanguage(socket, lang));
    expect(store.getActions()).toEqual(expectedActions);
    expect(socket.emit).toHaveBeenCalledWith('update-language', {
      lang: 'Spanish',
    });
  });

  test('changeOffice emits, dispatches', () => {
    const socket = {
      emit: jest.fn(),
    };
    const office = 1;
    const expectedActions = [updateOffice(office)];
    const store = mockStore(initState);
    store.dispatch(changeOffice(socket, office));
    expect(store.getActions()).toEqual(expectedActions);
    expect(socket.emit).toHaveBeenCalledWith('update-office', {
      office: 'SNAP',
      date: moment().format('l'),
    });
  });

  test('changeZipCode emits, dispatches', () => {
    const socket = {
      emit: jest.fn(),
    };
    const expectedActions = [updateZipCode(zipCode)];
    const store = mockStore(initState);
    store.dispatch(changeZipCode(socket, zipCode));
    expect(store.getActions()).toEqual(expectedActions);
    expect(socket.emit).toHaveBeenCalledWith('update-zip', {
      zipCode,
    });
  });

  test('changeLocation emits, dispatches', async () => {
    const socket = {
      emit: jest.fn(),
    };
    const expectedActions = [updateLocation(location)];
    const store = mockStore(initState);
    store.dispatch(changeLocation(socket, location));
    const zip = await mockFetchZipCode(location);
    expect(store.getActions()).toEqual(expectedActions);
    expect(socket.emit).toHaveBeenCalledWith('update-zip', {
      zipCode: zip,
    });
  });

  test('fetchOffices dispatches correct actions w/ zip', async () => {
    const { lat: latitude, lng: longitude } = zipCodeCoords;
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
      location,
    });
    return store.dispatch(fetchOffices()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('updateOffices dispatches correct actions when office is SNAP', async () => {
    const expectedActions = [
      populateSNAP(snapOffices),
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

  test('updateOffices dispatches correct actions when office is WIC', async () => {
    const expectedActions = [
      populateWICVendors(vendors),
      populateWIC(wicOffices),
      updateMapLoading(false),
    ];
    const store = mockStore({
      ...initState,
      mapLoading: true,
    });
    return updateOffices(
      store.dispatch,
      2,
      38.5386881,
      -122.695547,
    ).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
