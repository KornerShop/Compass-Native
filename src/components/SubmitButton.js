import React from "react";
import { string, bool, func } from "prop-types";

import { Button } from "react-native-elements";

const SubmitButton = props =>
  <Button
    title={props.title}
    raised={!props.zip}
    textStyle={{
      color: props.zip ? "#21CFBF" : "white",
      fontSize: props.zip ? 22 : 18,
      fontWeight: "bold"
    }}
    buttonStyle={{
      paddingHorizontal: props.zip ? 20 : null,
      borderWidth: props.zip ? 1 : 0,
      borderColor: props.zip ? "white" : null,
      backgroundColor: props.zip ? "white" : "tomato"
    }}
    containerViewStyle={{
      marginTop: props.zip ? 100 : null,
      width: props.zip ? 200 : null,
      borderRadius: props.zip ? 25 : 5
    }}
    borderRadius={props.zip ? 25 : 5}
    fontSize={18}
    onPress={props.onPress}
  />;

SubmitButton.propTypes = {
  title: string.isRequired,
  onPress: func.isRequired,
  zip: bool
};

export default SubmitButton;
