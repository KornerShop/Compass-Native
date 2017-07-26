import React from "react";
import { string, bool, func, oneOf } from "prop-types";
import { View } from "react-native";
import { Button } from "react-native-elements";
import localizedStrings from "../utilities/localization";

const EligibilityButton = props =>
  <View accessible={false}>
    <Button
      title={props.title}
      raised
      textStyle={{ fontWeight: "bold", color: "white" }}
      buttonStyle={{
        backgroundColor: "tomato"
      }}
      containerViewStyle={{
        marginRight: props.ineligible ? 0 : 20,
        marginLeft: props.ineligible ? 0 : 20,
        marginBottom: props.ineligible ? 5 : 20,
        borderRadius: 5
      }}
      borderRadius={5}
      fontSize={18}
      accessibilityLabel={
        props.ineligible
          ? localizedStrings[props.language].ineligible.header
          : localizedStrings[props.language].eligible.header
      }
      onPress={() => props.updateWicEligibility(0)}
      onAccessibilityTap={() => props.updateWicEligibility(0)}
    />
  </View>;

EligibilityButton.defaultProps = {
  ineligible: false
};

EligibilityButton.propTypes = {
  updateWicEligibility: func.isRequired,
  title: string.isRequired,
  language: oneOf(["en", "es"]).isRequired,
  ineligible: bool
};

export default EligibilityButton;
