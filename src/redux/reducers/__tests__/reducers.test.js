import rootReducer from '../index';
import initialState from '../../initialState';
import * as actions from '../../actions/actions';

let appState = initialState;
let payload;

test('@@INIT', () => {
  const state = rootReducer(undefined, {});
  expect(state).toEqual(appState);
});

test('UPDATE_ZIP_CODE', () => {
  payload = '95404';
  const state = rootReducer(
    appState,
    actions.updateZipCode(payload),
  );
  expect(state).toEqual({ ...initialState, zipCode: payload });
});

test('SET_LANGUAGE_PREFERENCE', () => {
  appState = { ...appState, zipCode: payload };
  payload = 'es';
  const state = rootReducer(
    initialState,
    actions.setLanguagePreference(payload),
  );
  expect(state).toEqual({ ...initialState, language: payload });
});

test('TOGGLE_LOCATION_PROVIDED', () => {
  appState = { ...appState, language: payload };
  payload = true;
  const state = rootReducer(
    appState,
    actions.toggleLocationProvided(payload),
  );
  expect(state).toEqual({ ...appState, locationProvided: payload });
});

test('UPDATE_WIC_ELIGIBILITY', () => {
  appState = { ...appState, language: payload };
  payload = 1;
  const state = rootReducer(
    appState,
    actions.updateWicEligibility(payload),
  );
  expect(state).toEqual({ ...appState, wicEligible: payload });
});

test('UPDATE_ORIENTATION', () => {
  appState = { ...appState, wicEligible: payload };
  payload = {
    width: 411.42857142857144,
    height: 683.4285714285714,
    scale: 2.625,
    fontScale: 1,
  };
  const state = rootReducer(
    appState,
    actions.updateOrientation(payload),
  );
  expect(state).toEqual({
    ...appState,
    orientation: payload,
  });
});

test('UPDATE_OFFICE', () => {
  appState = {
    ...appState,
    orientation: payload,
  };
  payload = 1;
  const state = rootReducer(appState, actions.updateOffice(payload));
  expect(state).toEqual({ ...appState, office: payload });
});

test('TOGGLE_MAP_LOADING', () => {
  appState = {
    ...appState,
    office: payload,
  };
  payload = true;
  const state = rootReducer(
    appState,
    actions.updateMapLoading(payload),
  );
  expect(state).toEqual({ ...appState, mapLoading: payload });
});

test('UPDATE_LOCATION', () => {
  appState = {
    ...appState,
    mapLoading: payload,
  };
  payload = {
    latitude: 38.5386881,
    longitude: -122.695547,
    latitudeDelta: 0.4,
    longitudeDelta: 0.4,
  };
  const state = rootReducer(
    appState,
    actions.updateLocation(payload),
  );
  expect(state).toEqual({ ...appState, location: payload});
});

test('POPULATE_SNAP_OFFICES', () => {
  appState = {
    ...appState,
    location: payload,
  };
  payload = [
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
  ];
  const state = rootReducer(appState, actions.populateSNAP(payload));
  expect(state).toEqual({
    ...appState,
    snapOffices: payload,
  });
});

test('POPULATE_WIC_OFFICES', () => {
  appState = {
    ...appState,
    snapOffices: payload,
  };
  payload = [
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
  ];
  const state = rootReducer(appState, actions.populateWIC(payload));
  expect(state).toEqual({
    ...appState,
    wicOffices: payload,
  });
});

test('POPULATE_WIC_VENDORS', () => {
  appState = {
    ...appState,
    wicOffices: payload,
  };
  payload = [
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
  ];
  const state = rootReducer(appState, actions.populateWICVendors(payload));
  expect(state).toEqual({
    ...appState,
    wicVendors: payload,
  });
});

test('POPULATE_FOOD_BANKS', () => {
  appState = {
    ...appState,
    wicVendors: payload,
  };
  payload = [
    {
      address: '1766 Industrial Way, Napa, CA 94558, USA',
      id: 'ChIJi_4gLBsmdkAROG8pXQJfljQ',
      lat: 38.3197489,
      lng: -122.3052978,
      name: 'Napa Food Bank',
      phone_intl: '+1 707-253-6128',
      phone_local: '(707) 253-6128',
    },
    {
      address: '3990 Brickway Blvd, Santa Rosa, CA 95403, USA',
      id: 'ChIJL-sNQZE-hIARjAV6WJSVGH4',
      lat: 38.513952,
      lng: -122.792842,
      name: 'Redwood Empire Food Bank',
      phone_intl: '+1 707-523-7900',
      phone_local: '(707) 523-7900',
    },
    {
      address: '6550 Railroad Ave, Forestville, CA 95436, USA',
      id: 'ChIJ7wNdy7Y8hIARyv8emgC-DGE',
      lat: 38.4725772,
      lng: -122.8908573,
      name: 'Food For Thought',
      phone_intl: '+1 707-887-1647',
      phone_local: '(707) 887-1647',
    },
    {
      address: '2900 McBride Ln, Santa Rosa, CA 95403, USA',
      id: 'ChIJ19sz4fpHhIARuPVky_DOAws',
      lat: 38.46553799999999,
      lng: -122.729861,
      name: 'F.I.S.H. Food Pantry',
      phone_intl: '+1 707-527-5151',
      phone_local: '(707) 527-5151',
    },
    {
      address: '2310 Laurel St # 1, Napa, CA 94559, USA',
      id: 'ChIJYcilHVAGhYARUeV_KxiJWAU',
      lat: 38.29342199999999,
      lng: -122.300276,
      name: 'Community Action of Napa Valley',
      phone_intl: '+1 707-253-6100',
      phone_local: '(707) 253-6100',
    },
    {
      address: '500 Robinson Rd, Sebastopol, CA 95472, USA',
      id: 'ChIJKVu99qUwhIARjO1iQ_KcNMk',
      lat: 38.3969701,
      lng: -122.8324209,
      name: 'Inter-Church Food Pantry',
      phone_intl: '+1 707-823-2483',
      phone_local: '(707) 823-2483',
    },
    {
      address: 'PO Box 507, Sonoma, CA 95476, USA',
      id: 'ChIJxamrqgKshYARzrPtrr68QQE',
      lat: 38.291859,
      lng: -122.4580356,
      name: 'Fish',
      phone_intl: '+1 707-996-0111',
      phone_local: '(707) 996-0111',
    },
    {
      address: '8987 Windsor Rd, Windsor, CA 95492, USA',
      id: 'ChIJNeXtJuU9hIAREv6pMsDshTY',
      lat: 38.546802,
      lng: -122.817157,
      name: 'Windsor Service Alliance',
      phone_intl: '+1 707-838-6947',
      phone_local: '(707) 838-6947',
    },
    {
      address: '93 Stony Cir, Santa Rosa, CA 95401, USA',
      id: 'ChIJyzXBdjs4hIARidyp6emZJj0',
      lat: 38.4398226,
      lng: -122.7475301,
      name: 'The Salvation Army Santa Rosa',
      phone_intl: '+1 707-542-0981',
      phone_local: '(707) 542-0981',
    },
    {
      address: '1505 Healdsburg Ave, Healdsburg, CA 95448, USA',
      id: 'ChIJTyXW48AQhIAR43uiF9ZF6cw',
      lat: 38.629398,
      lng: -122.8728423,
      name: 'Healdsburg Shared Ministries',
      phone_intl: '+1 707-433-3663',
      phone_local: '(707) 433-3663',
    },
    {
      address: '1301 4th St, Napa, CA 94559, USA',
      id: 'ChIJr7b-RGgGhYARAE4exlAKef0',
      lat: 38.2957919,
      lng: -122.2862386,
      name: 'Community Action-Napa Valley-Hope',
      phone_intl: '+1 707-259-8133',
      phone_local: '(707) 259-8133',
    },
    {
      address: '433 Soscol Ave a120, Napa, CA 94559, USA',
      id: 'ChIJ723YYg0GhYARoeNIKrPtL6I',
      lat: 38.2893383,
      lng: -122.2763325,
      name: 'The Peter and Vernice Gasser Foundation',
      phone_intl: '+1 707-255-1646',
      phone_local: '(707) 255-1646',
    },
    {
      address: '952 Napa St, Napa, CA 94559, USA',
      id: 'ChIJ47GHmGAGhYAR6HxKM1DAxRY',
      lat: 38.3031988,
      lng: -122.2877404,
      name: 'Puertas Abiertas Community Resource Center',
      phone_intl: '+1 707-224-1786',
      phone_local: '(707) 224-1786',
    },
    {
      address: '18960 County Road 75A, Brooks, CA 95606, USA',
      id: 'ChIJC26GiUvthIARHlvLE_WVQXs',
      lat: 38.75871739999999,
      lng: -122.1573766,
      name: 'Yocha Dehe Wintun Nation',
      phone_intl: '+1 530-796-3400',
      phone_local: '(530) 796-3400',
    },
    {
      address: '721 S McDowell Blvd, Petaluma, CA 94954, USA',
      id: 'ChIJlx1kpOKzhYARnQKkZ4BCKWY',
      lat: 38.24398559999999,
      lng: -122.6155286,
      name: 'Salvation Army',
      phone_intl: '+1 707-769-0716',
      phone_local: '(707) 769-0716',
    },
    {
      address:
        '1500 Petaluma Blvd S, 55 Shasta Ave, Petaluma, CA 94952, USA',
      id: 'ChIJt8nURhG0hYAReQmu2W1cNjs',
      lat: 38.2474888,
      lng: -122.6438765,
      name: 'Petaluma Bounty Farm',
      phone_intl: '+1 707-775-3663',
      phone_local: '(707) 775-3663',
    },
    {
      address: '900 Hopper St, Petaluma, CA 94952, USA',
      id: 'ChIJSbCn_wC0hYAR9AuKk82MxZs',
      lat: 38.2336867,
      lng: -122.6234004,
      name: 'Petaluma Kitchen',
      phone_intl: '+1 707-778-6380',
      phone_local: '(707) 778-6380',
    },
    {
      address: '1333 3rd St, Napa, CA 94559, USA',
      id: 'ChIJAzlUFGgGhYAR9o5_Qh-s_js',
      lat: 38.2962346,
      lng: -122.2868405,
      name: 'The Table at First Presbyterian Church',
      phone_intl: '+1 707-224-8693',
      phone_local: '(707) 224-8693',
    },
    {
      address:
        '975 Corporate Center Pkwy #160, Santa Rosa, CA 95407, USA',
      id: 'ChIJ7WNkDv9HhIARHJN8scXMbY8',
      lat: 38.424602,
      lng: -122.7537751,
      name: 'United Way of the Wine Country',
      phone_intl: '+1 707-528-4485',
      phone_local: '(707) 528-4485',
    },
    {
      address: '1907 Novato Blvd, Novato, CA 94947, USA',
      id: 'ChIJz-HsV5u7hYARu5tVzF82kPU',
      lat: 38.1099728,
      lng: -122.5883525,
      name: 'Human Needs Center of Novato',
      phone_intl: '+1 415-897-4147',
      phone_local: '(415) 897-4147',
    },
  ];
  const state = rootReducer(appState, actions.populateFoodBanks(payload));
  expect(state).toEqual({
    ...appState,
    foodBanks: payload,
  });
});
