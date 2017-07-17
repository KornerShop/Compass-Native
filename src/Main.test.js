import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-rest-renderer/shallow';
import { Provider } from 'react-redux';

import Main, { Unwrapped as UnwrappedMain } from './Main';
import Welcome from './screens/Welcome';
import NavigationProvider from './containers/NavigationProvider';

const wait = (exp, ms) =>
  new Promise(resolve => setTimeout(() => resolve(exp), ms));

describe('renderer tests', () => {
  test('UnwrappedMain renders correctly', () => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<UnwrappedMain />); 
    expect(wrapper.state()).toMatchObject({
      started: false,
      isLoading: true,
    });
    expect(wrapper).toMatchSnapshot();
  });

  xtest('Main renders correctly', () => {
    const store = mockStore(initState);
    const wrapper = shallow(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  xtest('Main renders Welcome after initial load', async () => {
    const wrapper = shallow(<UnwrappedMain />);
    await wait(wrapper.setState({ isLoading: false }), 100);
    expect(wrapper.find(Welcome)).toBeTruthy();
  });

  xtest('Main renders navigationProvider after language chosen', async () => {
    const wrapper = shallow(<UnwrappedMain />);
    await wait(wrapper.setState({ isLoading: false }), 100);
    wrapper.setState({ started: true });
    expect(wrapper.find(NavigationProvider)).toBeTruthy();
  });

  test('Main renders navigationProvider after language chosen (event)', async () => {
    const wrapper = shallow(<UnwrappedMain />);
    await wait(wrapper.setState({ isLoading: false }), 100);
    wrapper.find(Welcome).simulate('press', [1])
    expect(wrapper.find(NavigationProvider)).toBeTruthy();
  });
});

// tests for content ('compass', button on welcome, spanish if language Spanish elsewhere)
// make checklist after completing this file ^
// test to make sure mapstatetoprops and mapdispatchtoprops functions are present
// redux tests (Redux guide) + props tests for connected export (perhaps related)
// see 'Main renders correctly', above...needs mock store & provider (see btholt's file)
