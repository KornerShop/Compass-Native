import rootReducer from '../index';
import initState from '../../initialState';
import * as types from '../../actions/types';

let appState = initState;

test('@@INIT', () => {
  const state = rootReducer(undefined, {});
  expect(state).toEqual(initState);
});

test('SET_LANGUAGE_PREFERENCE', () => {
  const state = rootReducer(initState, {
    type: types.SET_LANGUAGE_PREFERENCE,
    payload: 'es',
  });
  expect(state).toEqual({ ...initState, language: 'es' });
});

test('toggleLocationProvided', () => {
  appState = { ...appState, language: 'es' };
  const state = rootReducer(appState, {
    type: types.TOGGLE_LOCATION_PROVIDED,
    payload: true,
  });
  expect(state).toEqual({ ...appState, locationProvided: true });
});

test('updateZipCode', () => {
  appState = { ...appState, locationProvided: true };
  const state = rootReducer(appState, {
    type: types.UPDATE_ZIPCODE,
    payload: '95404',
  });
  expect(state).toEqual({ ...appState, zipCode: '95404' });
});

test('updateWicEligibility', () => {
  appState = { ...appState, zipCode: '95404' };
  const state = rootReducer(appState, {
    type: types.UPDATE_WIC_ELIGIBILITY,
    payload: 1,
  });
  expect(state).toEqual({ ...appState, wicEligible: 1 });
});

test('updateOrientation', () => {
  appState = { ...appState, wicEligible: 1 };
  const state = rootReducer(appState, {
    type: types.UPDATE_ORIENTATION,
    payload: {
      width: 411.42857142857144,
      height: 683.4285714285714,
      scale: 2.625,
      fontScale: 1,
    },
  });
  expect(state).toEqual({
    ...appState,
    orientation: {
      width: 411.42857142857144,
      height: 683.4285714285714,
      scale: 2.625,
      fontScale: 1,
    },
  });
});

test('updateOffice', () => {
  appState = {
    ...appState,
    orientation: {
      width: 411.42857142857144,
      height: 683.4285714285714,
      scale: 2.625,
      fontScale: 1,
    },
  };
  const state = rootReducer(appState, {
    type: types.UPDATE_OFFICE,
    payload: 1,
  });
  expect(state).toEqual({ ...appState, office: 1 });
});

test('updateMapLoading', () => {
  appState = {
    ...appState,
    office: 1,
  };
  const state = rootReducer(appState, {
    type: types.TOGGLE_MAP_LOADING,
    payload: true,
  });
  expect(state).toEqual({ ...appState, mapLoading: true });
});

test('updateLocation', () => {
  appState = {
    ...appState,
    mapLoading: true,
  };
  const state = rootReducer(appState, {
    type: types.UPDATE_LOCATION,
    payload: {
      latitude: 38.5386881,
      longitude: -122.695547,
      latitudeDelta: 0.4,
      longitudeDelta: 0.4,
    },
  });
  expect(state).toEqual({
    ...appState,
    location: {
      latitude: 38.5386881,
      longitude: -122.695547,
      latitudeDelta: 0.4,
      longitudeDelta: 0.4,
    },
  });
});

test('populateSNAP', () => {
  appState = {
    ...appState,
    location: {
      latitude: 38.5386881,
      longitude: -122.695547,
      latitudeDelta: 0.4,
      longitudeDelta: 0.4,
    },
  };
  const state = rootReducer(appState, {
    type: types.POPULATE_SNAP_OFFICES,
    payload: [
      {
        id: 'ChIJWcnjX3c4hIAReEaEIu-h5Dg',
        lat: 38.464769,
        lng: -122.721573,
        name: 'Sonoma County Human Services Department',
        address: '2550 Paulin Dr # 1, Santa Rosa, CA 95403, USA',
        phone_local: '(877) 699-6868',
        phone_intl: '+1 877-699-6868',
      },
      {
        id: 'ChIJ2S8f1PhHhIARUVCsEnyrOEw',
        lat: 38.443262,
        lng: -122.715587,
        name: 'Sonoma County Economic Assistance 2',
        address: '520 Mendocino Ave, Santa Rosa, CA 95402, USA',
        phone_local: '(877) 699-6868',
        phone_intl: '+1 877-699-6868',
      },
    ],
  });
  expect(state).toEqual({
    ...appState,
    snapOffices: [
      {
        id: 'ChIJWcnjX3c4hIAReEaEIu-h5Dg',
        lat: 38.464769,
        lng: -122.721573,
        name: 'Sonoma County Human Services Department',
        address: '2550 Paulin Dr # 1, Santa Rosa, CA 95403, USA',
        phone_local: '(877) 699-6868',
        phone_intl: '+1 877-699-6868',
      },
      {
        id: 'ChIJ2S8f1PhHhIARUVCsEnyrOEw',
        lat: 38.443262,
        lng: -122.715587,
        name: 'Sonoma County Economic Assistance 2',
        address: '520 Mendocino Ave, Santa Rosa, CA 95402, USA',
        phone_local: '(877) 699-6868',
        phone_intl: '+1 877-699-6868',
      },
    ],
  });
});

test('populateWIC', () => {
  appState = {
    ...appState,
    snapOffices: [
      {
        id: 'ChIJWcnjX3c4hIAReEaEIu-h5Dg',
        lat: 38.464769,
        lng: -122.721573,
        name: 'Sonoma County Human Services Department',
        address: '2550 Paulin Dr # 1, Santa Rosa, CA 95403, USA',
        phone_local: '(877) 699-6868',
        phone_intl: '+1 877-699-6868',
      },
      {
        id: 'ChIJ2S8f1PhHhIARUVCsEnyrOEw',
        lat: 38.443262,
        lng: -122.715587,
        name: 'Sonoma County Economic Assistance 2',
        address: '520 Mendocino Ave, Santa Rosa, CA 95402, USA',
        phone_local: '(877) 699-6868',
        phone_intl: '+1 877-699-6868',
      },
    ],
  };
  const state = rootReducer(appState, {
    type: types.POPULATE_WIC_OFFICES,
    payload: [
      {
        id: 'ChIJ697sM6e2hYARGih3Xt7SAAE',
        lat: 38.2319379,

        lng: -122.6442755,
        name: 'WIC Petaluma',
        address: '11 English St, Petaluma, CA 94952, USA',
        phone_local: '(800) 816-3663',
        phone_intl: '+1 800-816-3663',
      },
      {
        id: 'ChIJ8RLqxDw4hIARCChYAI7Tp20',
        lat: 38.439528,
        lng: -122.7437988,
        name: 'Volunteer Center of Sonoma County',
        address: '153 Stony Cir #100, Santa Rosa, CA 95401, USA',
        phone_local: '(707) 573-3399',
        phone_intl: '+1 707-573-3399',
      },
      {
        id: 'ChIJD2NWug1zhYARmELjE9P_loU',
        lat: 38.1016731,
        lng: -122.2390356,
        name: 'Prime Time Nutrition',
        address: '1530 Solano Ave, Vallejo, CA 94590, USA',
        phone_local: '(707) 644-6600',
        phone_intl: '+1 707-644-6600',
      },
      {
        id: 'ChIJ24DSyww-hIAROpzUsj2K5Zs',
        lat: 38.5431579,
        lng: -122.8017116,
        name: 'Alliance Medical Center',
        address: '8465 Old Redwood Hwy #320, Windsor, CA 95492, USA',
        phone_local: '(707) 433-5494',
        phone_intl: '+1 707-433-5494',
      },
      {
        id: 'ChIJy1-q0DRzhYARuIqXldjxVYw',
        lat: 38.13150350000001,
        lng: -122.2387657,
        name: 'La Clinica Vallejo Great Begin',
        address: '210 Hospital Dr, Vallejo, CA 94589, USA',
        phone_local: '(707) 645-7316',
        phone_intl: '+1 707-645-7316',
      },
    ],
  });
  expect(state).toEqual({
    ...appState,
    wicOffices: [
      {
        id: 'ChIJ697sM6e2hYARGih3Xt7SAAE',
        lat: 38.2319379,

        lng: -122.6442755,
        name: 'WIC Petaluma',
        address: '11 English St, Petaluma, CA 94952, USA',
        phone_local: '(800) 816-3663',
        phone_intl: '+1 800-816-3663',
      },
      {
        id: 'ChIJ8RLqxDw4hIARCChYAI7Tp20',
        lat: 38.439528,
        lng: -122.7437988,
        name: 'Volunteer Center of Sonoma County',
        address: '153 Stony Cir #100, Santa Rosa, CA 95401, USA',
        phone_local: '(707) 573-3399',
        phone_intl: '+1 707-573-3399',
      },
      {
        id: 'ChIJD2NWug1zhYARmELjE9P_loU',
        lat: 38.1016731,
        lng: -122.2390356,
        name: 'Prime Time Nutrition',
        address: '1530 Solano Ave, Vallejo, CA 94590, USA',
        phone_local: '(707) 644-6600',
        phone_intl: '+1 707-644-6600',
      },
      {
        id: 'ChIJ24DSyww-hIAROpzUsj2K5Zs',
        lat: 38.5431579,
        lng: -122.8017116,
        name: 'Alliance Medical Center',
        address: '8465 Old Redwood Hwy #320, Windsor, CA 95492, USA',
        phone_local: '(707) 433-5494',
        phone_intl: '+1 707-433-5494',
      },
      {
        id: 'ChIJy1-q0DRzhYARuIqXldjxVYw',
        lat: 38.13150350000001,
        lng: -122.2387657,
        name: 'La Clinica Vallejo Great Begin',
        address: '210 Hospital Dr, Vallejo, CA 94589, USA',
        phone_local: '(707) 645-7316',
        phone_intl: '+1 707-645-7316',
      },
    ],
  });
});

test('populateWICVendors', () => {
  appState = {
    ...appState,
    wicOffices: [
      {
        id: 'ChIJ697sM6e2hYARGih3Xt7SAAE',
        lat: 38.2319379,

        lng: -122.6442755,
        name: 'WIC Petaluma',
        address: '11 English St, Petaluma, CA 94952, USA',
        phone_local: '(800) 816-3663',
        phone_intl: '+1 800-816-3663',
      },
      {
        id: 'ChIJ8RLqxDw4hIARCChYAI7Tp20',
        lat: 38.439528,
        lng: -122.7437988,
        name: 'Volunteer Center of Sonoma County',
        address: '153 Stony Cir #100, Santa Rosa, CA 95401, USA',
        phone_local: '(707) 573-3399',
        phone_intl: '+1 707-573-3399',
      },
      {
        id: 'ChIJD2NWug1zhYARmELjE9P_loU',
        lat: 38.1016731,
        lng: -122.2390356,
        name: 'Prime Time Nutrition',
        address: '1530 Solano Ave, Vallejo, CA 94590, USA',
        phone_local: '(707) 644-6600',
        phone_intl: '+1 707-644-6600',
      },
      {
        id: 'ChIJ24DSyww-hIAROpzUsj2K5Zs',
        lat: 38.5431579,
        lng: -122.8017116,
        name: 'Alliance Medical Center',
        address: '8465 Old Redwood Hwy #320, Windsor, CA 95492, USA',
        phone_local: '(707) 433-5494',
        phone_intl: '+1 707-433-5494',
      },
      {
        id: 'ChIJy1-q0DRzhYARuIqXldjxVYw',
        lat: 38.13150350000001,
        lng: -122.2387657,
        name: 'La Clinica Vallejo Great Begin',
        address: '210 Hospital Dr, Vallejo, CA 94589, USA',
        phone_local: '(707) 645-7316',
        phone_intl: '+1 707-645-7316',
      },
    ],
  };
  const state = rootReducer(appState, {
    type: types.POPULATE_WIC_VENDORS,
    payload: [
      {
        Address: 'S 3118 SEPULVEDA BLVD',
        City: 'LOS ANGELES',
        County: ' LOS ANGELES',
        Location: '(34.0266400  , -118.42726)',
        'Second Address': '  ',
        Vendor: 'VONS #2077',
        'Zip Code': ' 90034',
        _id: 1434,
        rank: 0.0573088,
      },
      {
        Address: ' 10113 VENICE BLVD',
        City: 'LOS ANGELES',
        County: ' LOS ANGELES',
        Location: '(34.0226830  , -118.40066)',
        'Second Address': '  ',
        Vendor: 'SMART & FINAL #330',
        'Zip Code': ' 90034',
        _id: 1568,
        rank: 0.0573088,
      },
      {
        Address: ' 3568 MOTOR AVE',
        City: 'LOS ANGELES',
        County: ' LOS ANGELES',
        Location: '(34.0251710  , -118.40723)',
        'Second Address': '  ',
        Vendor: 'PALMS SUPERMARKET',
        'Zip Code': ' 90034',
        _id: 1630,
        rank: 0.0573088,
      },
      {
        Address: ' 9860 NATIONAL BLVD',
        City: 'CHEVIOT HILLS',
        County: ' LOS ANGELES',
        Location: '(34.0301510  , -118.40143)',
        'Second Address': '  ',
        Vendor: 'VONS #2100',
        'Zip Code': ' 90034',
        _id: 2173,
        rank: 0.0573088,
      },
    ],
  });
  expect(state).toEqual({
    ...appState,
    wicVendors: [
      {
        Address: 'S 3118 SEPULVEDA BLVD',
        City: 'LOS ANGELES',
        County: ' LOS ANGELES',
        Location: '(34.0266400  , -118.42726)',
        'Second Address': '  ',
        Vendor: 'VONS #2077',
        'Zip Code': ' 90034',
        _id: 1434,
        rank: 0.0573088,
      },
      {
        Address: ' 10113 VENICE BLVD',
        City: 'LOS ANGELES',
        County: ' LOS ANGELES',
        Location: '(34.0226830  , -118.40066)',
        'Second Address': '  ',
        Vendor: 'SMART & FINAL #330',
        'Zip Code': ' 90034',
        _id: 1568,
        rank: 0.0573088,
      },
      {
        Address: ' 3568 MOTOR AVE',
        City: 'LOS ANGELES',
        County: ' LOS ANGELES',
        Location: '(34.0251710  , -118.40723)',
        'Second Address': '  ',
        Vendor: 'PALMS SUPERMARKET',
        'Zip Code': ' 90034',
        _id: 1630,
        rank: 0.0573088,
      },
      {
        Address: ' 9860 NATIONAL BLVD',
        City: 'CHEVIOT HILLS',
        County: ' LOS ANGELES',
        Location: '(34.0301510  , -118.40143)',
        'Second Address': '  ',
        Vendor: 'VONS #2100',
        'Zip Code': ' 90034',
        _id: 2173,
        rank: 0.0573088,
      },
    ],
  });
});
