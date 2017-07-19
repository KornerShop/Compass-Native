import React from 'react';
import { func, oneOf } from 'prop-types';

import { View, ScrollView, Text } from 'react-native';

import {
  StyledContainer,
  FormHeader,
} from '../components/styled/Styled';
import EligibilityButton from '../components/EligibilityButton';

import localizedStrings from '../utilities/localization';

const Eligible = ({ language, updateWicEligibility }) =>
  <View
    style={{
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 5,
      paddingBottom: 5,
      backgroundColor: '#2c2c2c',
    }}
  >
    <StyledContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-around',
        }}
      >
        <FormHeader>
          {localizedStrings[language].eligible.header}
        </FormHeader>
        <Text
          style={{
            fontSize: 80,
            textAlign: 'center',
          }}
        >
          <span role="img" aria-label="Thumbs Up">
            👍
          </span>
        </Text>
        <EligibilityButton
          language={language}
          title={localizedStrings[language].buttons.recheck}
          accessibility={
            localizedStrings[language].buttons.accessibilityRecheck
          }
          updateWicEligibility={updateWicEligibility}
        />
      </ScrollView>
    </StyledContainer>
  </View>;

Eligible.propTypes = {
  updateWicEligibility: func.isRequired,
  language: oneOf(['es', 'en']).isRequired,
};

export default Eligible;
