import React, {Component} from 'react'
import {ActivityIndicator, WebView} from 'react-native'
import {connect} from 'react-redux'
import styled from 'styled-components/native'

const ActivityIndicatorWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

class Snap extends Component {
  render() {
    const host = 'https://getcalfresh.org/en/apply'
    const url = this.props.language === 'en' ? host : `${host}?new_locale=es`
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
}

const mapStateToProps = ({language}) => ({language})

export default connect(mapStateToProps)(Snap)
