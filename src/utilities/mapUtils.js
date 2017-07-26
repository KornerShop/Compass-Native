import { MAPS_API_KEY } from './config';
import get from './fetch';

export const titleCase = str =>
  str
    .split(' ')
    .map(word => `${word[0]}${word.toLowerCase().substring(1)}`)
    .join(' ')
    .replace(undefined, '')
    .trim();

export const findZipCode = arr => {
  const targetObj = arr.find(obj =>
    obj.types.includes('postal_code'),
  );
  return targetObj.short_name
    ? targetObj.short_name
    : targetObj.long_name;
};

export const fetchZipCode = async ({ latitude, longitude }) => {
  const data = await get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_API_KEY}`,
  );
  return findZipCode(data.results[0].address_components);
};

export const fetchZipCodeCoords = async zip => {
  const data = await get(
    `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${zip}|country:US&key=${MAPS_API_KEY}`,
  );
  return data.results[0].geometry.location;
};

export const fetchResults = async (lat, lng, keyword) => {
  const placeUri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50000&keyword=${keyword}&key=${MAPS_API_KEY}`;
  const places = await get(placeUri);
  const placesWithDetails = await Promise.all(
    places.results.map(async place => {
      const placeDetailsUri = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.place_id}&key=${MAPS_API_KEY}`;
      const placeDetails = await get(placeDetailsUri);
      return { ...place, ...placeDetails };
    }),
  );
  console.log(`${JSON.stringify(placesWithDetails)}`);
  
  return placesWithDetails.map(place => ({
    id: place.place_id,
    lat: place.geometry.location.lat,
    lng: place.geometry.location.lng,
    name: place.name,
    address: place.result.formatted_address,
    phone_local: place.result.formatted_phone_number,
    phone_intl: place.result.international_phone_number,
  }));
};

export const fetchFoodBanks = async (lat, lng) => {
  const placeUri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50000&keyword=foodbank&key=${MAPS_API_KEY}`;
  const places = await get(placeUri);
  const placesWithDetails = await Promise.all(
    places.results.map(async place => {
      const placeDetailsUri = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.place_id}&key=${MAPS_API_KEY}`;
      const placeDetails = await get(placeDetailsUri);
      return { ...place, ...placeDetails };
    }),
  );
  return placesWithDetails.map(place => ({
    id: place.place_id,
    lat: place.geometry.location.lat,
    lng: place.geometry.location.lng,
    name: place.name,
    address: place.result.formatted_address,
    phone_local: place.result.formatted_phone_number,
    phone_intl: place.result.international_phone_number,
  }));
};

export const fetchWICVendorDetails = async zipCode => {
  const uri = `https://data.chhs.ca.gov/api/action/datastore_search?resource_id=ee10b67b-2b93-47e7-aa41-cecfbbd32e17&limit=5&q=${zipCode}`;
  const vendors = await get(uri);
  return Promise.all(
    vendors.result.records.map(async vendor => {
      let lat;
      let lng;
      vendor.Location.split('  , ').forEach(coord => {
        if (coord.includes('(')) {
          lat = parseFloat(coord.replace('(', ''));
        }
        if (coord.includes(')')) {
          lng = parseFloat(coord.replace(')', ''));
        }
      });
      const data = await get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_API_KEY}`,
      );
      return {
        id: data.results[0].place_id,
        name: titleCase(vendor.Vendor),
        address: `${titleCase(vendor.Address)}, ${titleCase(
          vendor.City,
        )}, CA, ${vendor['Zip Code']}, USA`,
        lat,
        lng,
      };
    }),
  );
};

export const fetchWICVendorsLocationPermission = async (
  latitude,
  longitude,
) => {
  const zipCode = await fetchZipCode({ latitude, longitude });
  const vendors = await fetchWICVendorDetails(zipCode);
  return vendors;
};

export const fetchWICVendorsZipCode = async zipCode => {
  const vendors = await fetchWICVendorDetails(zipCode);
  return vendors;
};
