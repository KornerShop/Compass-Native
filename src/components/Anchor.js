import React from "react";
import { string, func, bool } from "prop-types";
import { Linking, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Anchor = ({ href, onPress, children, eligible }) => {
  const handlePress = () => {
    Linking.openURL(href);
    onPress && onPress();
  };
  return (
    <Text
      onPress={handlePress}
      style={{
        fontSize: eligible && 25,
        fontWeight: "bold",
        textAlign: "center",
        color: "royalblue"
      }}
    >
      {children}
      {children &&
        !eligible &&
        <View
          style={{
            backgroundColor: "white",
            width: 20,
            height: 30,
            flex: 1,
            marginLeft: 10,
            paddingTop: 5
          }}
        >
          <Ionicons name="ios-call-outline" size={28} color="royalblue" />
        </View>}
    </Text>
  );
};

Anchor.defaultProps = {
  onPress: null,
  children: null,
  eligible: null
};

Anchor.propTypes = {
  href: string.isRequired,
  onPress: func,
  children: string,
  eligible: bool
};

export default Anchor;
