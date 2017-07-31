import React from "react";
import { func, oneOf } from "prop-types";

import { View, Text } from "react-native";

import { StyledContainer, EligibleHeader } from "../components/styled/Styled";
import EligibilityButton from "../components/EligibilityButton";

import localizedStrings from "../utilities/localization";
import Anchor from "../components/Anchor";

const Eligible = ({ language, updateWicEligibility }) =>
  <View
    style={{
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 5,
      paddingBottom: 15,
      backgroundColor: "white"
    }}
  >
    <StyledContainer>
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          paddingVertical: 25
        }}
      >
        <EligibleHeader>
          {localizedStrings[language].eligible.header}
        </EligibleHeader>
        <EligibleHeader>
          {localizedStrings[language].eligible.next}
        </EligibleHeader>
        <Text
          style={{
            paddingTop: 5,
            paddingRight: 10,
            paddingLeft: 10,
            paddingBottom: 2,
            fontSize: 20,
            textAlign: "left"
          }}
        >
          {localizedStrings[language].eligible.stepOne}
        </Text>
        <Anchor href={"tel:+18889429675"} eligible>
          1-888-942-9675
        </Anchor>
        <Text
          style={{
            paddingTop: 5,
            paddingRight: 10,
            paddingLeft: 10,
            paddingBottom: 2,
            fontSize: 20,
            textAlign: "left"
          }}
        >
          {localizedStrings[language].eligible.stepTwo}
        </Text>
        <Text
          style={{
            paddingTop: 5,
            paddingRight: 10,
            paddingLeft: 10,
            paddingBottom: 2,
            fontSize: 20,
            textAlign: "left"
          }}
        >
          {localizedStrings[language].eligible.stepThree}
        </Text>
        <EligibilityButton
          language={language}
          title={localizedStrings[language].buttons.recheck}
          accessibility={
            localizedStrings[language].buttons.accessibilityRecheck
          }
          updateWicEligibility={updateWicEligibility}
        />
      </View>
    </StyledContainer>
  </View>;

Eligible.propTypes = {
  updateWicEligibility: func.isRequired,
  language: oneOf(["es", "en"]).isRequired
};

export default Eligible;
