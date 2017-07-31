import React from "react";
import { oneOf } from "prop-types";
import { View, StatusBar, ActivityIndicator, WebView } from "react-native";
import { connect } from "react-redux";
import localizedStrings from "../utilities/localization";
import { ActivityIndicatorWrapper } from "../components/styled/Styled";

const Snap = ({ language }) => {
  const host = "https://getcalfresh.org/en/apply";
  const url = language === "en" ? host : `${host}?new_locale=es`;
  const translatedMessage = localizedStrings[language].snap.accessible;

  return (
    <View
      accessible
      accessibilityLabel={translatedMessage}
      style={{
        flex: 1,
        paddingTop: 15,
        paddingBottom: 5,
        paddingHorizontal: 5,
        backgroundColor: "white"
      }}
    >
      <StatusBar barStyle="dark-content" />
      <WebView
        accessible
        borderRadius={10}
        source={{ uri: url }}
        style={{ marginTop: 15 }}
        startInLoadingState
        renderLoading={() =>
          <ActivityIndicatorWrapper>
            <ActivityIndicator color="#21CFBF" size="large" />
          </ActivityIndicatorWrapper>}
      />
    </View>
  );
};

Snap.propTypes = {
  language: oneOf(["en", "es"]).isRequired
};

const mapStateToProps = ({ language }) => ({
  language
});

export default connect(mapStateToProps)(Snap);
