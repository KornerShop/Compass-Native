import React, { Component } from "react";
import { func } from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SocketIOClient from "socket.io-client";

import {
  AsyncStorage,
  ActivityIndicator,
  View,
  Dimensions
} from "react-native";

import { SOCKET_ADDR } from "./utilities/config";

import NavigationProvider from "./containers/NavigationProvider";
import Welcome from "./screens/Welcome";
import { ActivityIndicatorWrapper } from "./components/styled/Styled";

import {
  updateOrientation,
  setLanguagePreference
} from "./redux/actions/actions";

import { cacheImages, cacheFonts } from "./utilities/cacheAssetsAsync";

class Main extends Component {
  state = {
    started: false,
    isLoading: true
  };
  componentDidMount() {
    // Not ideal, but this action is necessary for getting the initial orientation of the device
    this.props.updateOrientation(Dimensions.get("window"));
    this.loadAssetsAsync();
  }
  getLanguage = async () => {
    try {
      const language = await AsyncStorage.getItem("language");
      this.setState({
        isLoading: false
      });
      if (language) {
        this.setState({
          started: true
        });
        this.props.setLanguagePreference(language);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  socket = SocketIOClient(SOCKET_ADDR, {
    transports: ["websocket"]
  });
  toggleStart = () => {
    this.setState({ started: !this.state.started });
  };
  loadAssetsAsync = async () => {
    await cacheImages([
      require("./assets/shopper.png"),
      require("./assets/snap1.jpg"),
      require("./assets/wic1.jpeg"),
      require("./assets/groceries.png"),
      require("./assets/building.png"),
      require("./assets/apple.png")
    ]);
    await cacheFonts({
      "merriweather-sans": require("./assets/fonts/MerriweatherSans-Regular.ttf")
    });
    this.setState({
      isLoading: false
    });
  };
  renderRoot = Comp =>
    <View
      style={{ flex: 1 }}
      onLayout={() => this.props.updateOrientation(Dimensions.get("window"))}
    >
      <Comp socket={this.socket} toggleStart={this.toggleStart} />
    </View>;
  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicatorWrapper>
          <ActivityIndicator color="#21CFBF" size="large" />
        </ActivityIndicatorWrapper>
      );
    }
    return this.state.started
      ? this.renderRoot(NavigationProvider)
      : this.renderRoot(Welcome);
  }
}

Main.propTypes = {
  updateOrientation: func.isRequired,
  setLanguagePreference: func.isRequired
};

const mapDispatchToProps = dispatch => ({
  updateOrientation: bindActionCreators(updateOrientation, dispatch),
  setLanguagePreference: bindActionCreators(setLanguagePreference, dispatch)
});

export const Unwrapped = Main;

export default connect(null, mapDispatchToProps)(Main);
