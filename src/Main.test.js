import { ActivityIndicator } from 'react-native';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';

import Main, { Unwrapped as UnwrappedMain } from './Main';
import Welcome from './screens/Welcome';
import NavigationProvider from './containers/NavigationProvider';

import initState from './redux/initialState';

const wait = (exp, ms) =>
  new Promise(resolve => setTimeout(() => resolve(exp), ms));

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('renderer tests', () => {
  test('UnwrappedMain renders correctly (shallow)', () => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<UnwrappedMain />);
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.children).toEqual(
      <ActivityIndicator
        animating
        color="#00897b"
        hidesWhenStopped
        size="large"
      />,
    );
    expect(result).toMatchSnapshot();
  });

  test('Main renders correctly', async () => {
    const store = mockStore({
      ...initState,
      orientation: {
        width: 411.42857142857144,
        height: 683.4285714285714,
        scale: 2.625,
        fontScale: 1,
      },
    });
    const tree = renderer
      .create(
        <Provider store={store}>
          <Main />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// tests for content ('compass', button on welcome, spanish if language Spanish elsewhere)
// test to make sure mapstatetoprops and mapdispatchtoprops functions are present
// redux tests (Redux guide) + props tests for connected export (perhaps related)
// see 'Main renders correctly', above...needs mock store & provider (see btholt's file)
