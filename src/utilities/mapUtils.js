import {MAPS_API_KEY} from './config'
import {get} from './fetch'

export const fetchZipCodeCoords = zip => {
  const data = get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${MAPS_API_KEY}`
  )
  return data.results[0].geometry.location
}

export const fetchResults = async (latitude, longitude, keyword) => {
  const uri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&keyword=${keyword}&key=${MAPS_API_KEY}`
  const data = await get(uri)
  return data.results
}
