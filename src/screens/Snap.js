import React from 'react';
import { oneOf } from 'prop-types';
import {
  View,
  StatusBar,
  ActivityIndicator,
  WebView
} from 'react-native';
import { connect } from 'react-redux';

import { ActivityIndicatorWrapper } from '../components/styled/Styled';

const Snap = props => {
  const host = 'https://getcalfresh.org/en/apply';
  const url =
    props.language === 'en' ? host : `${host}?new_locale=es`;
  return (
    <View
      accessible={true}
      accessibilityLabel={'Determine eligibility for Food Stamps'}
      style={{
        flex: 1,
        paddingTop: 15,
        paddingBottom: 5,
        paddingHorizontal: 5,
        backgroundColor: '#2C2C2C'
      }}
    >
      <StatusBar barStyle="light-content" />
      <WebView
        accessible={true}
        borderRadius={10}
        source={{ uri: url }}
        style={{ marginTop: 15 }}
        startInLoadingState={true}
        renderLoading={() =>
          <ActivityIndicatorWrapper>
            <ActivityIndicator color="#00897b" size="large" />
          </ActivityIndicatorWrapper>}
      />
    </View>
  );
};

Snap.propTypes = {
  language: oneOf(['en', 'es'])
};

const mapStateToProps = ({ language }) => ({
  language
});

export default connect(mapStateToProps)(Snap);
