import moment from "moment";
import {
  updateMapLoading,
  updateLocation,
  populateSNAP,
  populateWIC,
  populateWICVendors,
  setLanguagePreference,
  updateOffice,
  updateZipCode,
  populateFoodBanks
} from "./actions";

import {
  fetchZipCode,
  fetchZipCodeCoords,
  fetchResults,
  fetchWICVendors,
  fetchFoodBanks
} from "../../utilities/mapUtils";

export const updateFoodBanks = async (dispatch, latitude, longitude) => {
  const foodBanks = await fetchFoodBanks(latitude, longitude);
  dispatch(populateFoodBanks(foodBanks));
  dispatch(updateMapLoading(false));
};

export const getFoodBanks = () => async (dispatch, getState) => {
  dispatch(updateMapLoading(true));
  const { zipCode } = getState();
  if (zipCode) {
    const { lat: latitude, lng: longitude } = await fetchZipCodeCoords(zipCode);
    updateFoodBanks(dispatch, latitude, longitude);
  } else {
    const { latitude, longitude } = getState().location;
    updateFoodBanks(dispatch, latitude, longitude);
  }
};

export const updateLanguage = (socket, lang) => dispatch => {
  socket.emit("update-language", {
    lang: lang === "es" ? "Spanish" : "English"
  });
  dispatch(setLanguagePreference(lang));
};

export const changeOffice = (socket, office) => dispatch => {
  socket.emit("update-office", {
    office: office === 1 ? "SNAP" : "WIC",
    date: moment().format("l")
  });
  dispatch(updateOffice(office));
};

export const changeZipCode = (socket, zipCode) => dispatch => {
  socket.emit("update-zip", {
    zipCode
  });
  dispatch(updateZipCode(zipCode));
};

export const changeLocation = (socket, location) => async dispatch => {
  dispatch(updateLocation(location));
  const zipCode = await fetchZipCode(location);
  socket.emit("update-zip", {
    zipCode
  });
};

export const updateOffices = async (dispatch, office, latitude, longitude) => {
  let keyword;
  let action;
  if (office === 1) {
    keyword = "calfresh";
    action = populateSNAP;
  } else {
    keyword = "wic";
    action = populateWIC;
    const zipCode = await fetchZipCode({ latitude, longitude });
    const vendors = await fetchWICVendors(zipCode);
    dispatch(populateWICVendors(vendors));
  }
  const offices = await fetchResults(latitude, longitude, keyword);
  dispatch(action(offices));
  dispatch(updateMapLoading(false));
};

export const fetchOffices = () => async (dispatch, getState) => {
  dispatch(updateMapLoading(true));
  const { office, zipCode } = getState();
  if (zipCode) {
    var { lat: latitude, lng: longitude } = await fetchZipCodeCoords(zipCode);
  } else {
    var { latitude, longitude } = getState().location;
  }
  dispatch(updateLocation({ latitude, longitude }));
  updateOffices(dispatch, office, latitude, longitude);
};
