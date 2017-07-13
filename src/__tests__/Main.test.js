import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';
import { Provider } from 'react-redux';

import store from '../redux/store';

import Main, { Unwrapped as UnwrappedMain } from '../Main';

test('Main renders correctly', () => {
  const component = shallow(
    <Provider store={store}>
      <Main />
    </Provider>,
  );
  expect(component).toMatchSnapshot();
});
