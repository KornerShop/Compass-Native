import * as actions from '../redux/actions/actions';

test('setLanguagePreference', () => {
  expect(actions.setLanguagePreference('es')).toMatchSnapshot();
});

test('toggleLocationProvided', () => {
  expect(actions.toggleLocationProvided(true)).toMatchSnapshot();
});

test('updateZipCode', () => {
  expect(actions.updateZipCode(95404)).toMatchSnapshot();
});

test('updateWicEligibility', () => {
  expect(actions.updateWicEligibility(1)).toMatchSnapshot();
});

test('updateOrientation', () => {
  expect(
    actions.updateOrientation({
      width: 411.42857142857144,
      height: 683.4285714285714,
      scale: 2.625,
      fontScale: 1,
    }),
  ).toMatchSnapshot();
});

test('updateOffice', () => {
  expect(actions.updateOffice(1)).toMatchSnapshot();
});

test('updateMapLoading', () => {
  expect(actions.updateMapLoading(false)).toMatchSnapshot();
});

test('updateLocation', () => {
  expect(
    actions.updateLocation({
      latitude: 38.5386881,
      longitude: -122.695547,
      latitudeDelta: 0.4,
      longitudeDelta: 0.4,
    }),
  ).toMatchSnapshot();
});

test('populateSNAP', () => {
  expect(
    actions.populateSNAP([
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
    ]),
  ).toMatchSnapshot();
});

test('populateWIC', () => {
  expect(
    actions.populateWIC([
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
    ]),
  );
});
