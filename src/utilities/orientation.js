export default dimensions => {
  let view;
  const { height, width } = dimensions;
  if (!dimensions.height || !dimensions.width) {
    throw new Error(
      'landscape method requires an object with properties height and width',
    );
  }
  if (dimensions.height < dimensions.width) {
    view = 'landscape';
  } else {
    view = 'portrait';
  }
  return {
    view,
    height,
    width,
  };
};
