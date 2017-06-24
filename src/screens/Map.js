import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {MapView} from 'expo'
import {updateLocation} from '../redux/actions/actions'

class Map extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <MapView style={{flex: 1}} initialRegion={this.props.location} />
  }
}

const mapStateToProps = ({language, orientation, location}) => ({
  language,
  orientation,
  location,
})

const mapDispatchToProps = dispatch => ({
  updateLocation: bindActionCreators(updateLocation, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)
