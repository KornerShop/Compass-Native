import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

class Map extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>MAP!</Text>
      </View>
    )
  }
}

const mapStateToProps = ({language, orientation}) => ({language, orientation})

const styles = StyleSheet.create({
  container: {
    padding: 100,
  },
  text: {
    fontSize: 43,
  },
})

export default connect(mapStateToProps)(Map)
