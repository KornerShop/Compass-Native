import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';

import initState from '../../initialState';

import {
  fetchZipCodeCoords,
  fetchResults,
  fetchWICVendorsZipCode,
  fetchFoodBanks,
} from '../../../utilities/mapUtils';

import {
  updateOffice,
  updateZipCode,
  updateLocation,
  setLanguagePreference,
  updateMapLoading,
  populateSNAP,
  populateWIC,
  populateWICVendors,
  populateFoodBanks,
} from '../actions';

import {
  updateLanguage,
  changeOffice,
  changeZipCode,
  changeLocation,
  updateOffices,
  updateWICVendorsZipModal,
  updateWICVendorsLocationPermission,
  getFoodBanks,
  updateFoodBanks,
} from '../actionCreators';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const zipCode = 95404;

const location = {
  latitude: 38.5386881,
  longitude: -122.695547,
  latitudeDelta: 0.4,
  longitudeDelta: 0.4,
};

const mockSnapOffices = [
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

const mockWicOffices = [
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

describe('updateOffices', () => {
  it("dispatches correct actions when office is SNAP & Zip isn't known", async () => {
    const { latitude, longitude } = location;
    const snapOffices = await fetchResults(
      latitude,
      longitude,
      'calfresh',
    );
    const expectedActions = [
      updateMapLoading(true),
      updateLocation({ latitude, longitude }),
      populateSNAP(snapOffices),
      updateMapLoading(false),
    ];
    const store = mockStore({
      ...initState,
      office: 1,
      location,
    });
    return store.dispatch(updateOffices()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches correct actions when office is WIC & Zip is known', async () => {
    const { latitude, longitude } = location;
    const wicOffices = await fetchResults(latitude, longitude, 'wic');
    const expectedActions = [
      updateMapLoading(true),
      updateLocation({ latitude, longitude }),
      populateWIC(wicOffices),
      updateMapLoading(false),
    ];
    const store = mockStore({
      ...initState,
      office: 2,
      zipCode: 95404,
    });
    return store.dispatch(updateOffices()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

test('updateWICVendorsZipModal', async () => {
  const wicVendors = await fetchWICVendorsZipCode(zipCode);
  const expectedActions = [
    populateWICVendors(wicVendors),
    updateMapLoading(false),
  ];
  const store = mockStore({
    ...initState,
    mockWicOffices,
    mockSnapOffices,
  });
  return store
    .dispatch(updateWICVendorsZipModal(zipCode))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('updateWICVendorsLocationPermission', async () => {
  const wicVendors = await fetchWICVendorsZipCode(zipCode);
  const expectedActions = [
    populateWICVendors(wicVendors),
    updateMapLoading(false),
  ];
  const store = mockStore({
    ...initState,
    mockWicOffices,
    mockSnapOffices,
  });
  return store
    .dispatch(
      updateWICVendorsLocationPermission(
        location.latitude,
        location.longitude,
      ),
    )
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('getFoodBanks', async () => {
  const { latitude, longitude } = location;
  const foodBanks = await fetchFoodBanks(latitude, longitude);
  const expectedActions = [
    updateLocation({ latitude, longitude }),
    populateFoodBanks(foodBanks),
    updateMapLoading(false),
  ];
  const store = mockStore(initState);
  return getFoodBanks(
    store.dispatch,
    latitude,
    longitude,
  ).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('updateFoodBanks', () => {
  it("dispatches correct actions when zip isn't known", () => {
    const { latitude, longitude } = location;
    const expectedActions = [
      updateMapLoading(true),
      updateLocation({ latitude, longitude }),
    ];
    const store = mockStore({
      ...initState,
      location,
    });
    return store.dispatch(updateFoodBanks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('dispatches correct actions when zip is known', () => {
    const { latitude, longitude } = location;
    const expectedActions = [
      updateMapLoading(true),
      updateLocation({ latitude, longitude }),
    ];
    const store = mockStore({
      ...initState,
      zipCode,
    });
    return store.dispatch(updateFoodBanks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
