import React from 'react';
import { func, oneOf } from 'prop-types';

import { View, Text, Linking} from 'react-native';

import {
  StyledContainer,
  FormHeader,
} from '../components/styled/Styled';
import EligibilityButton from '../components/EligibilityButton';

import localizedStrings from '../utilities/localization';
import Anchor from '../components/Anchor'

const Eligible = ({ language, updateWicEligibility }) =>
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
          {localizedStrings[language].eligible.header}
        </FormHeader>
        <Text
          style={{
            padding:20,
            fontSize: 20,
            textAlign: 'left',
          }}
        >
          {localizedStrings[language].eligible.stepOne}
        </Text>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20}}>
            <Anchor href={'tel:+18889429675}'} eligible>
              1-888-942-9675
            </Anchor>
          </Text>
        </View>
        <Text
          style={{
            padding:20,
            fontSize: 20,
            textAlign: 'left',
          }}>
          {localizedStrings[language].eligible.stepTwo}
        </Text>
        <Text
          style={{
            padding:20,
            fontSize: 20,
            textAlign: 'left',
          }}>
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
  language: oneOf(['es', 'en']).isRequired,
};

export default Eligible;
