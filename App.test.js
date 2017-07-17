import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import App from './App';

it('renders properly', () => {
  const shallowRenderer = new ShallowRenderer();
  shallowRenderer.render(<App />);
  const wrapper = shallowRenderer.getRenderOutput();
  expect(wrapper).toMatchSnapshot();
});
