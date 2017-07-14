import {
  updateMapLoading,
  updateLocation,
  populateSNAP,
  populateWIC,
  setLanguagePreference,
  updateOffice,
  updateZipCode,
} from './actions';

import {
  fetchZipCode,
  fetchZipCodeCoords,
  fetchResults,
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
  });
  dispatch(updateOffice(office));
};

export const changeZipCode = (socket, zipCode) => dispatch => {
  socket.emit('update-zip', {
    zipCode,
  });
  dispatch(updateZipCode(zipCode));
};

export const changeLocation = (socket, location) => async dispatch => {
  dispatch(updateLocation(location))
  const zipCode = await fetchZipCode(location);
  socket.emit('update-zip', {
    zipCode,
  });
};

export const updateOffices = async (
  dispatch,
  officeNum,
  latitude,
  longitude,
) => {
  let keyword;
  let action;
  if (officeNum === 1) {
    keyword = 'calfresh';
    action = populateSNAP;
  } else {
    keyword = 'wic';
    action = populateWIC;
  }
  const offices = await fetchResults(latitude, longitude, keyword);
  dispatch(action(offices));
  dispatch(updateMapLoading(false));
};

export const fetchOffices = bool => async (dispatch, getState) => {
  dispatch(updateMapLoading(true));
  const { office, zipCode } = getState();
  if (bool) {
    var { lat: latitude, lng: longitude } = await fetchZipCodeCoords(
      zipCode,
    );
  } else {
    var { latitude, longitude } = getState().location;
  }
  dispatch(updateLocation({ latitude, longitude }));
  updateOffices(dispatch, office, latitude, longitude);
};
