import {MAPS_API_KEY} from './config'
import {get} from './fetch'

export const fetchZipCodeCoords = async zip => {
  const data = await get(
    `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${zip}|country:US&key=${MAPS_API_KEY}`
  )
  return data.results[0].geometry.location
}

export const fetchResults = async (latitude, longitude, keyword) => {
  const placeUri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&keyword=${keyword}&key=${MAPS_API_KEY}`
  const places = await get(placeUri)
  const placesWithDetails = await Promise.all(
    places.results.map(async place => {
      const placeDetailsUri = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.place_id}&key=${MAPS_API_KEY}`
      const placeDetails = await get(placeDetailsUri)
      return {...place, ...placeDetails}
    })
  )
  return placesWithDetails.map(place => ({
    id: place.place_id,
    latitude: place.geometry.location.lat,
    longitude: place.geometry.location.lng,
    name: place.name,
    address: place.result.formatted_address,
    phone_local: place.result.formatted_phone_number,
    phone_intl: place.result.international_phone_number,
  }))
}
