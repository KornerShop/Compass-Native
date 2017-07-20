import React from 'react';
import { string, func } from 'prop-types';
import { Linking, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Anchor = ({ href, onPress, children }) => {
  const handlePress = () => {
    Linking.openURL(href);
    onPress && onPress();
  };
  return (
    <Text
      onPress={handlePress}
      style={{ fontWeight: 'bold', textAlign: 'center' }}
    >
      {children}
      {children &&
        <View
          style={{
            backgroundColor: 'white',
            width: 20,
            height: 30,
            flex: 1,
            marginLeft: 10,
            paddingTop: 5,
          }}
        >
          <Ionicons
            name="ios-call-outline"
            size={28}
            color="royalblue"
          />
        </View>}
    </Text>
  );
};

Anchor.propTypes = {
  href: string.isRequired,
  onPress: func,
  children: string,
};

export default Anchor;
