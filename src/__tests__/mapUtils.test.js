import { fetchZipCodeCoords, fetchResults } from '../utilities/mapUtils';

test('fetchZipCodeCoords', async () => {
  const coords = await fetchZipCodeCoords('95404');
  expect(coords).toMatchSnapshot();
});

test('fetchResults', async () => {
  const results = await fetchResults(38.5386881, -122.695547, 'calfresh')
  expect(results).toMatchSnapshot();
})
