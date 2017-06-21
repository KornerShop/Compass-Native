import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Map extends React.Component {
  render() {
    return(
      <View style ={styles.container}>
        <Text style ={styles.text}>MAP!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 100
  },
  text: {
    fontSize:43
  }
})