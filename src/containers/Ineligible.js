import React from 'react';
import { func, oneOf } from 'prop-types';

import { View, ScrollView, Text } from 'react-native';

import {
  StyledContainer,
  FormHeader,
} from '../components/styled/Styled';
import EligibilityButton from '../components/EligibilityButton';

import localizedStrings from '../utilities/localization';

const Ineligible = ({ language, updateWicEligibility }) =>
  <View
    style={{
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 5,
      paddingBottom: 5,
      backgroundColor: 'white',
    }}
  >
    <StyledContainer>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
        }}
      >
        <FormHeader>
          {localizedStrings[language].ineligible.header}
        </FormHeader>
        <Text
          role="img"
          aria-label="WIC Office"
          style={{
            fontSize: 80,
            textAlign: 'center',
          }}
        >
          🏢
        </Text>
        <EligibilityButton
          language={language}
          ineligible
          title={localizedStrings[language].buttons.recheck}
          accessibility={
            localizedStrings[language].buttons.accessibilityRecheck
          }
          updateWicEligibility={updateWicEligibility}
        />
      </View>
    </StyledContainer>
  </View>;

Ineligible.propTypes = {
  updateWicEligibility: func.isRequired,
  language: oneOf(['es', 'en']).isRequired,
};

export default Ineligible;
