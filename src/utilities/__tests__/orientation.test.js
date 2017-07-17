import orientation from '../orientation';

test('orientation', () => {
  const position = orientation({
    width: 411.42857142857144,
    height: 683.4285714285714,
    scale: 2.625,
    fontScale: 1,
  });
  expect(position).toMatchSnapshot();
});
