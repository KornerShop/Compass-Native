import rootReducer from '../redux/reducers';
import initState from '../redux/initialState';
import * as types from '../redux/actions/types';

let appState = initState;

test('@@INIT', () => {
  const state = rootReducer(undefined, {});
  expect(state).toEqual(initState);
});

test('SET_LANGUAGE_PREFERENCE', () => {
  const state = rootReducer(initState, {
    type: types.SET_LANGUAGE_PREFERENCE,
    payload: 'es',
  });
  expect(state).toEqual({ ...initState, language: 'es' });
});

test('toggleLocationProvided', () => {
  appState = { ...appState, language: 'es' };
  const state = rootReducer(appState, {
    type: types.TOGGLE_LOCATION_PROVIDED,
    payload: true,
  });
  expect(state).toEqual({ ...appState, locationProvided: true });
});

test('updateZipCode', () => {
  appState = { ...appState, locationProvided: true };
  const state = rootReducer(appState, {
    type: types.UPDATE_ZIPCODE,
    payload: '95404',
  });
  expect(state).toEqual({ ...appState, zipCode: '95404' });
});
