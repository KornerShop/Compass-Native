import React from "react";
import { number, bool, func, object, oneOf } from "prop-types";

import { View, StatusBar, TouchableHighlight } from "react-native";

import { Button } from "react-native-elements";

import ZipModal from "./ZipModal";
import { ImageContainer, OfficeText } from "../components/styled/Styled";

import localizedStrings from "../utilities/localization";

const Office = props => {
  const officeChosen = async officeNum => {
    props.changeOffice(props.socket, officeNum);
    await props.getLocationAsync();
  };
  return (
    <View
      accessible
      style={{
        flex: 1,
        backgroundColor: "white"
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column"
        }}
      >
        <StatusBar barStyle="dark-content" />
        <TouchableHighlight
          style={{
            flex: 0.5,
            marginTop: 25,
            marginLeft: 5,
            marginRight: 5
          }}
          onPress={() => officeChosen(1)}
        >
          <ImageContainer
            borderRadius={2}
            height={props.height / 2}
            width={props.width - 10}
            source={require("../assets/snap1.jpg")}
            resizeMode="cover"
          >
            <OfficeText
              style={{
                fontFamily: "merriweather-sans"
              }}
            >
              CalFresh
            </OfficeText>
            <Button
              raised
              icon={{
                color: "#2C2C2C",
                type: "ionicon",
                name: "ios-nutrition",
                size: 30
              }}
              borderRadius={2}
              containerViewStyle={{
                borderRadius: 2,
                marginTop: 20
              }}
              buttonStyle={{
                paddingHorizontal: 30
              }}
              color="#2C2C2C"
              backgroundColor="white"
              title={localizedStrings[
                props.language
              ].buttons.office.toUpperCase()}
              fontFamily="merriweather-sans"
              onPress={() => officeChosen(1)}
            />
          </ImageContainer>
        </TouchableHighlight>
        <TouchableHighlight
          style={{
            flex: 0.5,
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 10
          }}
          onPress={() => officeChosen(2)}
        >
          <ImageContainer
            borderRadius={2}
            height={props.height / 2}
            width={props.width - 10}
            source={require("../assets/wic1.jpeg")}
            resizeMode="cover"
          >
            <OfficeText
              style={{
                fontFamily: "merriweather-sans"
              }}
            >
              WIC
            </OfficeText>
            <Button
              raised
              icon={{
                color: "#2C2C2C",
                type: "ionicon",
                name: "ios-woman",
                size: 30
              }}
              borderRadius={2}
              containerViewStyle={{
                borderRadius: 2,
                marginTop: 20
              }}
              buttonStyle={{
                paddingHorizontal: 30
              }}
              color="#2C2C2C"
              backgroundColor="white"
              title={localizedStrings[
                props.language
              ].buttons.office.toUpperCase()}
              fontFamily="merriweather-sans"
              onPress={() => officeChosen(2)}
            />
          </ImageContainer>
        </TouchableHighlight>
        <ZipModal
          socket={props.socket}
          language={props.language}
          changeZipCode={props.changeZipCode}
          modalVisible={props.modalVisible}
          fetchOffices={props.fetchOffices}
          toggleLocationProvided={props.toggleLocationProvided}
          toggleModalVisibility={props.toggleModalVisibility}
        />
      </View>
    </View>
  );
};

Office.propTypes = {
  getLocationAsync: func.isRequired,
  changeOffice: func.isRequired,
  height: number.isRequired,
  width: number.isRequired,
  changeZipCode: func.isRequired,
  modalVisible: bool.isRequired,
  fetchOffices: func.isRequired,
  toggleLocationProvided: func.isRequired,
  toggleModalVisibility: func.isRequired,
  language: oneOf(["en", "es"]).isRequired,
  socket: object.isRequired
};

export default Office;
