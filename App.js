import React from 'react'
import {StyleSheet, Text, View} from 'react-native';
import {
  NavigationProvider,
  TabNavigation,
  StackNavigation
} from '@expo/ex-navigation';
import Router from './navigation/Router';

export default class App extends React.Component {
  render() {
    return (
       <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('rootNavigation')} />
      </NavigationProvider>
    )
  }
}

