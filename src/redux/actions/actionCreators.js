import {
  updateMapLoading,
  updateLocation,
  populateSNAP,
  populateWIC,
  setLanguagePreference,
} from './actions';

import {
  fetchZipCodeCoords,
  fetchResults,
} from '../../utilities/mapUtils';

export const updateLanguage = (socket, lang) => dispatch => {
  socket.emit('update-language', {
    lang: lang === 'es' ? 'Spanish' : 'English',
  }, () => {
    console.warn('\n!!! EMISSION !!!\n');
  });
  dispatch(setLanguagePreference(lang));
}

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
