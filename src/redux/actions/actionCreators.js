import moment from 'moment';
import {
  updateMapLoading,
  updateLocation,
  populateSNAP,
  populateWIC,
  populateWICVendors,
  setLanguagePreference,
  updateOffice,
  updateZipCode,
  populateFoodBanks,
} from './actions';

import {
  fetchZipCode,
  fetchZipCodeCoords,
  fetchResults,
  fetchWICVendorsLocationPermission,
  fetchWICVendorsZipCode,
  fetchFoodBanks,
} from '../../utilities/mapUtils';

export const updateLanguage = (socket, lang) => dispatch => {
  socket.emit('update-language', {
    lang: lang === 'es' ? 'Spanish' : 'English',
  });
  dispatch(setLanguagePreference(lang));
};

export const changeOffice = (socket, office) => dispatch => {
  socket.emit('update-office', {
    office: office === 1 ? 'SNAP' : 'WIC',
    date: moment().format('l'),
  });
  dispatch(updateOffice(office));
};

export const changeZipCode = (socket, zipCode) => dispatch => {
  socket.emit('update-zip', {
    zipCode,
  });
  dispatch(updateZipCode(zipCode));
};

export const changeLocation = (
  socket,
  location,
) => async dispatch => {
  dispatch(updateLocation(location));
  const zipCode = await fetchZipCode(location);
  socket.emit('update-zip', {
    zipCode,
  });
};

export const updateOffices = () => async (dispatch, getState) => {
  dispatch(updateMapLoading(true));
  const { office, zipCode } = getState();
  if (zipCode) {
    var { lat: latitude, lng: longitude } = await fetchZipCodeCoords(
      zipCode,
    );
  } else {
    var { location: { latitude, longitude } } = getState();
  }
  dispatch(updateLocation({ latitude, longitude }));
  if (office === 1) {
    dispatch(
      populateSNAP(
        await fetchResults(latitude, longitude, 'calfresh'),
      ),
    );
  } else {
    dispatch(
      populateWIC(await fetchResults(latitude, longitude, 'wic')),
    );
  }
  dispatch(updateMapLoading(false));
};

export const updateWICVendorsZipModal = zipCode => async (
  dispatch,
  getState,
) => {
  const { wicOffices, snapOffices } = getState();
  dispatch(populateWICVendors(await fetchWICVendorsZipCode(zipCode)));
  wicOffices && snapOffices && dispatch(updateMapLoading(false));
};

export const updateWICVendorsLocationPermission = (
  latitude,
  longitude,
) => async (dispatch, getState) => {
  const { wicOffices, snapOffices } = getState();
  dispatch(
    populateWICVendors(
      await fetchWICVendorsLocationPermission(latitude, longitude),
    ),
  );
  wicOffices && snapOffices && dispatch(updateMapLoading(false));
};

export const getFoodBanks = async (dispatch, latitude, longitude) => {
  dispatch(updateLocation({ latitude, longitude }));
  const foodBanks = await fetchFoodBanks(latitude, longitude);
  dispatch(populateFoodBanks(foodBanks));
  dispatch(updateMapLoading(false));
};

export const updateFoodBanks = () => async (dispatch, getState) => {
  dispatch(updateMapLoading(true));
  const { zipCode } = getState();
  if (zipCode) {
    const {
      lat: latitude,
      lng: longitude,
    } = await fetchZipCodeCoords(zipCode);
    getFoodBanks(dispatch, latitude, longitude);
  } else {
    const { latitude, longitude } = getState().location;
    getFoodBanks(dispatch, latitude, longitude);
  }
};
