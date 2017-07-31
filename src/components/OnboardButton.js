import React from "react";
import { string, func } from "prop-types";

import { Button } from "react-native-elements";

const OnboardButton = props =>
  <Button
    style={{ justifyContent: "center", alignItems: "center" }}
    title={props.title}
    textStyle={{
      color: "#21CFBF",
      fontSize: 23,
      textAlign: "center",
      fontWeight: "bold"
    }}
    buttonStyle={{
      borderWidth: 3,
      width: 168,
      borderColor: "white",
      backgroundColor: "white"
    }}
    containerViewStyle={{
      marginTop: 5,
      marginBottom: 5,
      width: 500,
      borderRadius: 35
    }}
    borderRadius={35}
    onPress={props.onPress}
  />;

OnboardButton.propTypes = {
  title: string.isRequired,
  onPress: func.isRequired
};

export default OnboardButton;
