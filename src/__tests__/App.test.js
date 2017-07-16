import React from 'react';
import renderer from 'react-test-renderer';

import App from '../../App';

it('renders properly', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
