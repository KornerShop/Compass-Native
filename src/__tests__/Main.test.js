import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';
import { Provider } from 'react-redux';

import ActivityIndicator from 'react-native';

import Main, { Unwrapped as UnwrappedMain } from '../Main';
import Welcome from '../screens/Welcome';
import { ActivityIndicatorWrapper } from '../components/styled/Styled';
import NavigationProvider from '../containers/NavigationProvider';

import store from '../redux/store';

const wait = (exp, ms) =>
  new Promise(resolve => setTimeout(() => resolve(exp), ms));

describe('shallow tests', () => {
  test('Main renders correctly', () => {
    const wrapper = shallow(<UnwrappedMain />);
    expect(wrapper.state()).toMatchObject({
      started: false,
      isLoading: true,
    });
    expect(wrapper).toMatchSnapshot();
  });

  test('Main renders Welcome after initial load', async () => {
    const wrapper = shallow(<UnwrappedMain />);
    await wait(wrapper.setState({ isLoading: false }), 100);
    expect(wrapper.find(Welcome)).toBeTruthy();
  });

  test('Main renders navigationProvider after language chosen', async () => {
    const wrapper = shallow(<UnwrappedMain />);
    await wait(wrapper.setState({ isLoading: false }), 100);
    wrapper.setState({ started: true });
    expect(wrapper.find(NavigationProvider).toBeTruthy);
  });
})

// can you test Welcome's 'on tap' event to render NavigationProvider?

// Full DOM Rendering https://github.com/airbnb/enzyme
// Static Rendering https://github.com/airbnb/enzyme
