import * as actions from '../actions';

describe('actions', () => {
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
    ).toMatchSnapshot();
  });

  test('populateWICVendors', () => {
    expect(
      actions.populateWICVendors([
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
      ]),
    ).toMatchSnapshot();
  });

  test('populateFoodBanks', () => {
    expect(
      actions.populateFoodBanks([
        {
          id: 'ChIJi_4gLBsmdkAROG8pXQJfljQ',
          lat: 38.3197489,
          lng: -122.3052978,
          name: 'Napa Food Bank',
          address: '1766 Industrial Way, Napa, CA 94558, USA',
          phone_local: '(707) 253-6128',
          phone_intl: '+1 707-253-6128',
        },
        {
          id: 'ChIJL-sNQZE-hIARjAV6WJSVGH4',
          lat: 38.513952,
          lng: -122.792842,
          name: 'Redwood Empire Food Bank',
          address: '3990 Brickway Blvd, Santa Rosa, CA 95403, USA',
          phone_local: '(707) 523-7900',
          phone_intl: '+1 707-523-7900',
        },
        {
          id: 'ChIJ7wNdy7Y8hIARyv8emgC-DGE',
          lat: 38.4725772,
          lng: -122.8908573,
          name: 'Food For Thought',
          address: '6550 Railroad Ave, Forestville, CA 95436, USA',
          phone_local: '(707) 887-1647',
          phone_intl: '+1 707-887-1647',
        },
        {
          id: 'ChIJ19sz4fpHhIARuPVky_DOAws',
          lat: 38.46553799999999,
          lng: -122.729861,
          name: 'F.I.S.H. Food Pantry',
          address: '2900 McBride Ln, Santa Rosa, CA 95403, USA',
          phone_local: '(707) 527-5151',
          phone_intl: '+1 707-527-5151',
        },
        {
          id: 'ChIJYcilHVAGhYARUeV_KxiJWAU',
          lat: 38.29342199999999,
          lng: -122.300276,
          name: 'Community Action of Napa Valley',
          address: '2310 Laurel St # 1, Napa, CA 94559, USA',
          phone_local: '(707) 253-6100',
          phone_intl: '+1 707-253-6100',
        },
        {
          id: 'ChIJKVu99qUwhIARjO1iQ_KcNMk',
          lat: 38.3969701,
          lng: -122.8324209,
          name: 'Inter-Church Food Pantry',
          address: '500 Robinson Rd, Sebastopol, CA 95472, USA',
          phone_local: '(707) 823-2483',
          phone_intl: '+1 707-823-2483',
        },
        {
          id: 'ChIJxamrqgKshYARzrPtrr68QQE',
          lat: 38.291859,
          lng: -122.4580356,
          name: 'Fish',
          address: 'PO Box 507, Sonoma, CA 95476, USA',
          phone_local: '(707) 996-0111',
          phone_intl: '+1 707-996-0111',
        },
        {
          id: 'ChIJNeXtJuU9hIAREv6pMsDshTY',
          lat: 38.546802,
          lng: -122.817157,
          name: 'Windsor Service Alliance',
          address: '8987 Windsor Rd, Windsor, CA 95492, USA',
          phone_local: '(707) 838-6947',
          phone_intl: '+1 707-838-6947',
        },
        {
          id: 'ChIJyzXBdjs4hIARidyp6emZJj0',
          lat: 38.4398226,
          lng: -122.7475301,
          name: 'The Salvation Army Santa Rosa',
          address: '93 Stony Cir, Santa Rosa, CA 95401, USA',
          phone_local: '(707) 542-0981',
          phone_intl: '+1 707-542-0981',
        },
        {
          id: 'ChIJTyXW48AQhIAR43uiF9ZF6cw',
          lat: 38.629398,
          lng: -122.8728423,
          name: 'Healdsburg Shared Ministries',
          address: '1505 Healdsburg Ave, Healdsburg, CA 95448, USA',
          phone_local: '(707) 433-3663',
          phone_intl: '+1 707-433-3663',
        },
        {
          id: 'ChIJr7b-RGgGhYARAE4exlAKef0',
          lat: 38.2957919,
          lng: -122.2862386,
          name: 'Community Action-Napa Valley-Hope',
          address: '1301 4th St, Napa, CA 94559, USA',
          phone_local: '(707) 259-8133',
          phone_intl: '+1 707-259-8133',
        },
        {
          id: 'ChIJ723YYg0GhYARoeNIKrPtL6I',
          lat: 38.2893383,
          lng: -122.2763325,
          name: 'The Peter and Vernice Gasser Foundation',
          address: '433 Soscol Ave a120, Napa, CA 94559, USA',
          phone_local: '(707) 255-1646',
          phone_intl: '+1 707-255-1646',
        },
        {
          id: 'ChIJ47GHmGAGhYAR6HxKM1DAxRY',
          lat: 38.3031988,
          lng: -122.2877404,
          name: 'Puertas Abiertas Community Resource Center',
          address: '952 Napa St, Napa, CA 94559, USA',
          phone_local: '(707) 224-1786',
          phone_intl: '+1 707-224-1786',
        },
        {
          id: 'ChIJC26GiUvthIARHlvLE_WVQXs',
          lat: 38.75871739999999,
          lng: -122.1573766,
          name: 'Yocha Dehe Wintun Nation',
          address: '18960 County Road 75A, Brooks, CA 95606, USA',
          phone_local: '(530) 796-3400',
          phone_intl: '+1 530-796-3400',
        },
        {
          id: 'ChIJlx1kpOKzhYARnQKkZ4BCKWY',
          lat: 38.24398559999999,
          lng: -122.6155286,
          name: 'Salvation Army',
          address: '721 S McDowell Blvd, Petaluma, CA 94954, USA',
          phone_local: '(707) 769-0716',
          phone_intl: '+1 707-769-0716',
        },
        {
          id: 'ChIJt8nURhG0hYAReQmu2W1cNjs',
          lat: 38.2474888,
          lng: -122.6438765,
          name: 'Petaluma Bounty Farm',
          address:
            '1500 Petaluma Blvd S, 55 Shasta Ave, Petaluma, CA 94952, USA',
          phone_local: '(707) 775-3663',
          phone_intl: '+1 707-775-3663',
        },
        {
          id: 'ChIJSbCn_wC0hYAR9AuKk82MxZs',
          lat: 38.2336867,
          lng: -122.6234004,
          name: 'Petaluma Kitchen',
          address: '900 Hopper St, Petaluma, CA 94952, USA',
          phone_local: '(707) 778-6380',
          phone_intl: '+1 707-778-6380',
        },
        {
          id: 'ChIJAzlUFGgGhYAR9o5_Qh-s_js',
          lat: 38.2962346,
          lng: -122.2868405,
          name: 'The Table at First Presbyterian Church',
          address: '1333 3rd St, Napa, CA 94559, USA',
          phone_local: '(707) 224-8693',
          phone_intl: '+1 707-224-8693',
        },
        {
          id: 'ChIJ7WNkDv9HhIARHJN8scXMbY8',
          lat: 38.424602,
          lng: -122.7537751,
          name: 'United Way of the Wine Country',
          address:
            '975 Corporate Center Pkwy #160, Santa Rosa, CA 95407, USA',
          phone_local: '(707) 528-4485',
          phone_intl: '+1 707-528-4485',
        },
        {
          id: 'ChIJz-HsV5u7hYARu5tVzF82kPU',
          lat: 38.1099728,
          lng: -122.5883525,
          name: 'Human Needs Center of Novato',
          address: '1907 Novato Blvd, Novato, CA 94947, USA',
          phone_local: '(415) 897-4147',
          phone_intl: '+1 415-897-4147',
        },
      ]),
    ).toMatchSnapshot();
  });
});
