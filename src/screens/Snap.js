import React from 'react'
import {oneOf} from 'prop-types'
import {ActivityIndicator, WebView} from 'react-native'
import {connect} from 'react-redux'

import LinearGrad from '../components/LinearGradient'
import {ActivityIndicatorWrapper} from '../components/styled/Styled'

const Snap = props => {
  const host = 'https://getcalfresh.org/en/apply'
  const url = props.language === 'en' ? host : `${host}?new_locale=es`
  return (
    <LinearGrad>
      <WebView
        source={{uri: url}}
        style={{marginTop: 15, marginBottom: 10}}
        startInLoadingState={true}
        renderLoading={() => {
          return (
            <ActivityIndicatorWrapper>
              <ActivityIndicator color="#00897b" size="large" />
            </ActivityIndicatorWrapper>
          )
        }}
      />
    </LinearGrad>
  )
}

Snap.propTypes = {
  language: oneOf(['en', 'es']),
}

const mapStateToProps = ({language}) => ({language})

export default connect(mapStateToProps)(Snap)
