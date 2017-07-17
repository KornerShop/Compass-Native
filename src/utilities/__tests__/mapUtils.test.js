import {
  findZipCode,
  fetchZipCode,
  fetchZipCodeCoords,
  fetchResults,
} from '../mapUtils';

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
  const coords = await fetchZipCodeCoords('95404');
  expect(coords).toMatchSnapshot();
});

test('fetchResults', async () => {
  const results = await fetchResults(
    38.5386881,
    -122.695547,
    'calfresh',
  );
  expect(results).toMatchSnapshot();
});
