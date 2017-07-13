import MAPS_API_KEY from '../utilities/config';
import get from '../utilities/fetch';

test('fetch', async () => {
  const response = get(
    `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:95404|country:US&key=${MAPS_API_KEY}`,
  );
  expect(response).toMatchSnapshot();
});
