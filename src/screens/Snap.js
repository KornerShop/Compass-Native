import React from 'react'
import {oneOf} from 'prop-types'
import {ActivityIndicator, WebView} from 'react-native'
import {connect} from 'react-redux'

import {ActivityIndicatorWrapper} from '../components/styled/Styled'

const Snap = props => {
  const host = 'https://getcalfresh.org/en/apply'
  const url = props.language === 'en' ? host : `${host}?new_locale=es`
  return (
    <WebView
      source={{uri: url}}
      startInLoadingState={true}
      renderLoading={() => {
        return (
          <ActivityIndicatorWrapper>
            <ActivityIndicator color="tomato" size="large" />
          </ActivityIndicatorWrapper>
        )
      }}
    />
  )
}

Snap.propTypes = {
  language: oneOf(['en', 'es']),
}

const mapStateToProps = ({language}) => ({language})

export default connect(mapStateToProps)(Snap)
