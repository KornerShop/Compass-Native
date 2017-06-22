import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
} from '@expo/ex-navigation'
import {Platform} from 'react-native'
import Router from './Router'

export default class RootNavigation extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }
  render() {
    return (
      <TabNavigation
        id="main"
        initialTab="maps"
        navigatorUID="main"
        initialTab="maps">
        <TabItem
          id="maps"
          renderIcon={isSelected =>
            Platform.OS === 'ios'
              ? <Ionicons name="md-compass" size={32} color="tomato" />
              : <Ionicons name="ios-locate" size={32} color="tomato" />}>
          <StackNavigation id="map" initialRoute={Router.getRoute('maps')} />
        </TabItem>
        <TabItem
          id="snap"
          renderIcon={isSelected =>
            <Ionicons name="ios-nutrition-outline" size={32} color="tomato" />}>
          <StackNavigation id="snap" initialRoute={Router.getRoute('snap')} />
        </TabItem>
        <TabItem
          id="wic"
          renderIcon={isSelected =>
            <Ionicons name="ios-woman-outline" size={32} color="tomato" />}>
          <StackNavigation id="wic" initialRoute={Router.getRoute('wic')} />
        </TabItem>
      </TabNavigation>
    )
  }
}
