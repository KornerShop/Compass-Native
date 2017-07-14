import React from 'react';
import { string, func } from 'prop-types';
import { Linking, Text } from 'react-native';

const Anchor = ({ href, onPress, children }) => {
  const handlePress = () => {
    Linking.openURL(href);
    onPress && onPress();
  };
  return (
    <Text onPress={handlePress}>
      {children}
    </Text>
  );
};

Anchor.propTypes = {
  href: string.isRequired,
  onPress: func,
  children: string,
};

export default Anchor;
