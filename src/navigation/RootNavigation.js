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
        initialTab="resources"
        navigatorUID="main"
        initialTab="resources"
        tabBarStyle={{
          backgroundColor: '#d7d2cc',
          borderTopWidth: 2,
          borderColor: '#304352',
        }}
      >
        <TabItem
          id="resources"
          renderIcon={isSelected =>
            Platform.OS === 'ios'
              ? <Ionicons name="md-compass" size={32} color="#00897b" />
              : <Ionicons name="ios-locate" size={32} color="#00897b" />}
        >
          <StackNavigation
            id="resources"
            initialRoute={Router.getRoute('resources')}
          />
        </TabItem>
        <TabItem
          id="snap"
          renderIcon={isSelected =>
            <Ionicons name="ios-nutrition-outline" size={32} color="#00897b" />}
        >
          <StackNavigation id="snap" initialRoute={Router.getRoute('snap')} />
        </TabItem>
        <TabItem
          id="wic"
          renderIcon={isSelected =>
            <Ionicons name="ios-woman-outline" size={32} color="#00897b" />}
        >
          <StackNavigation id="wic" initialRoute={Router.getRoute('wic')} />
        </TabItem>
      </TabNavigation>
    )
  }
}
