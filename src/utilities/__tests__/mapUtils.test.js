import {
  titleCase,
  findZipCode,
  fetchZipCode,
  fetchZipCodeCoords,
  fetchResults,
  fetchFoodBanks,
  fetchWICVendorDetails,
  fetchWICVendorsLocationPermission,
  fetchWICVendorsZipCode,
} from '../mapUtils';

describe('mapUtils', () => {
  test('titleCase', () => {
    const properlyCased = titleCase('ONE TWO THREE, 1ST, 2ND, 3RD');
    expect(properlyCased).toMatchSnapshot();
  });

  test('findZipCode', () => {
    const results = [
      {
        long_name: '2590',
        short_name: '2590',
        types: ['street_number'],
      },
      {
        long_name: 'Mark West Springs Road',
        short_name: 'Mark West Springs Rd',
        types: ['route'],
      },
      {
        long_name: 'Santa Rosa',
        short_name: 'Santa Rosa',
        types: ['locality', 'political'],
      },
      {
        long_name: 'Sonoma County',
        short_name: 'Sonoma County',
        types: ['administrative_area_level_2', 'political'],
      },
      {
        long_name: 'California',
        short_name: 'CA',
        types: ['administrative_area_level_1', 'political'],
      },
      {
        long_name: 'United States',
        short_name: 'US',
        types: ['country', 'political'],
      },
      {
        long_name: '95404',
        short_name: '95404',
        types: ['postal_code'],
      },
      {
        long_name: '9606',
        short_name: '9606',
        types: ['postal_code_suffix'],
      },
    ];
    const zip = findZipCode(results);
    expect(zip).toMatchSnapshot();
  });

  test('fetchZipCode', async () => {
    const location = {
      latitude: 38.5386881,
      longitude: -122.695547,
      latitudeDelta: 0.4,
      longitudeDelta: 0.4,
    };
    const zip = await fetchZipCode(location);
    expect(zip).toMatchSnapshot();
  });

  test('fetchZipCodeCoords', async () => {
    const coords = await fetchZipCodeCoords(95404);
    expect(coords).toMatchSnapshot();
  });

  describe('fetchResults', async () => {
    const wicResults = await fetchResults(
      38.5386881,
      -122.695547,
      'calfresh',
    );
    const snapResults = await fetchResults(
      38.5386881,
      -122.695547,
      'wic',
    );
    it('returns an array of length 1 or more: SNAP', () => {
      expect(snapResults.length).toBeGreaterThanOrEqual(1);
    });
    it('returns an array of length 1 or more: WIC', () => {
      expect(wicResults.length).toBeGreaterThanOrEqual(1);
    });
    it('returns objects of proper shape: SNAP', () => {
      const firstResult = snapResults[0];
      expect(firstResult).toHaveProperty('address');
      expect(firstResult).toHaveProperty('id');
      expect(firstResult).toHaveProperty('lat');
      expect(firstResult).toHaveProperty('lng');
      expect(firstResult).toHaveProperty('name');
      expect(firstResult).toHaveProperty('phone_intl');
      expect(firstResult).toHaveProperty('phone_local');
    });
    it('returns objects of proper shape: WIC', () => {
      const firstResult = wicResults[0];
      expect(firstResult).toHaveProperty('address');
      expect(firstResult).toHaveProperty('id');
      expect(firstResult).toHaveProperty('lat');
      expect(firstResult).toHaveProperty('lng');
      expect(firstResult).toHaveProperty('name');
      expect(firstResult).toHaveProperty('phone_intl');
      expect(firstResult).toHaveProperty('phone_local');
    });
  });

  describe('fetchFoodBanks', async () => {
    const results = await fetchFoodBanks(38.5386881, -122.695547);
    it('returns an array of length 1 or more', async () => {
      expect(results.length).toBeGreaterThanOrEqual(1);
    });
    it('returns objects of proper shape', () => {
      const firstResult = results[0];
      expect(firstResult).toHaveProperty('address');
      expect(firstResult).toHaveProperty('id');
      expect(firstResult).toHaveProperty('lat');
      expect(firstResult).toHaveProperty('lng');
      expect(firstResult).toHaveProperty('name');
      expect(firstResult).toHaveProperty('phone_intl');
      expect(firstResult).toHaveProperty('phone_local');
    });
  });

  describe('fetchVendorDetails', async () => {
    const results = await fetchWICVendorDetails(95404);
    it('returns an array of length 1 or more', () => {
      expect(results.length).toBeGreaterThanOrEqual(1);
    });
    it('returns objects of proper shape', () => {
      const firstResult = results[0];
      expect(firstResult).toHaveProperty('address');
      expect(firstResult).toHaveProperty('id');
      expect(firstResult).toHaveProperty('lat');
      expect(firstResult).toHaveProperty('lng');
      expect(firstResult).toHaveProperty('name');
    });
  });

  describe('fetchWICVendorsLocationPermission', async () => {
    const results = await fetchWICVendorsLocationPermission(
      38.5386881,
      -122.695547,
    );
    it('returns an array of length 1 or more', () => {
      expect(results.length).toBeGreaterThanOrEqual(1);
    });
    it('returns objects of proper shape', () => {
      const firstResult = results[0];
      expect(firstResult).toHaveProperty('address');
      expect(firstResult).toHaveProperty('id');
      expect(firstResult).toHaveProperty('lat');
      expect(firstResult).toHaveProperty('lng');
      expect(firstResult).toHaveProperty('name');
    });
  });

  describe('fetchWICVendorsZipCode', async () => {
    const results = await fetchWICVendorsZipCode(95404);
    it('returns an array of length 1 or more', () => {
      expect(results.length).toBeGreaterThanOrEqual(1);
    });
    it('returns objects of proper shape', () => {
      const firstResult = results[0];
      expect(firstResult).toHaveProperty('address');
      expect(firstResult).toHaveProperty('id');
      expect(firstResult).toHaveProperty('lat');
      expect(firstResult).toHaveProperty('lng');
      expect(firstResult).toHaveProperty('name');
    });
  });
});
