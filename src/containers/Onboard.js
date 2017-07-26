import React from "react";
import { number, oneOf, func, shape } from "prop-types";
import { Text, View, Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-looped-carousel";

import styled from "styled-components/native";

import OnboardButton from "../components/OnboardButton";
import localizedStrings from "../utilities/localization";

const OnboardScreen = styled.View`
  flex: 1;
  background-color: #21cfbf;
`;

const Onboard = ({ orientation: { height, width }, toggleStart, language }) => {
  const orientationObj = {
    height,
    width
  };
  return (
    <OnboardScreen>
      <Carousel
        style={orientationObj}
        autoplay={false}
        bullets
        swipe
        bulletStyle={{
          backgroundColor: "white"
        }}
        chosenBulletStyle={{
          backgroundColor: "#78909c"
        }}
      >
        <View
          style={[
            {
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            },
            orientationObj
          ]}
        >
          <Text>
            {Platform.OS === "ios"
              ? <Ionicons name="md-compass" size={160} color="white" />
              : <Ionicons name="ios-locate" size={160} color="white" />}
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontWeight: "bold",
              padding: 20,
              textAlign: "center",
              fontSize: 30,
              color: "white",
              letterSpacing: 1
            }}
          >
            {localizedStrings[language].onboard.officeHeader}
          </Text>
          <Text
            style={{
              padding: 40,
              textAlign: "center",
              fontSize: 23,
              color: "white"
            }}
          >
            {localizedStrings[language].onboard.officeText}
          </Text>
        </View>
        <View
          style={[
            {
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            },
            orientationObj
          ]}
        >
          <Text>
            <Ionicons name="ios-nutrition-outline" size={160} color="white" />
          </Text>
          <Text
            style={{
              marginTop: 18,
              fontWeight: "bold",
              padding: 20,
              textAlign: "center",
              fontSize: 30,
              color: "white",
              letterSpacing: 4
            }}
          >
            CalFresh
          </Text>
          <Text
            style={{
              padding: 40,
              textAlign: "center",
              fontSize: 23,
              color: "white"
            }}
          >
            {localizedStrings[language].onboard.snapText}
          </Text>
        </View>
        <View
          style={[
            {
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            },
            orientationObj
          ]}
        >
          <Text>
            <Ionicons name="ios-woman-outline" size={160} color="white" />
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontWeight: "bold",
              padding: 10,
              textAlign: "center",
              fontSize: 30,
              color: "white",
              letterSpacing: 4
            }}
          >
            WIC
          </Text>
          <Text
            style={{
              padding: 30,
              textAlign: "center",
              fontSize: 23,
              color: "white",
              marginBottom: 20
            }}
          >
            {localizedStrings[language].onboard.wicText}
          </Text>
          <OnboardButton
            title={localizedStrings[language].buttons.onboard}
            onPress={toggleStart}
          />
        </View>
      </Carousel>
    </OnboardScreen>
  );
};

Onboard.propTypes = {
  language: oneOf(["en", "es"]).isRequired,
  orientation: shape({
    scale: number,
    height: number.isRequired,
    width: number.isRequired,
    fontScale: number
  }).isRequired,
  toggleStart: func.isRequired
};

export default Onboard;
