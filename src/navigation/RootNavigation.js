import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
} from '@expo/ex-navigation';
import { Platform } from 'react-native';
import Router from './Router';

export default class RootNavigation extends Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };
  render() {
    return (
      <TabNavigation
        id="main"
        initialTab="resources"
        navigatorUID="main"
        tabBarStyle={{
          backgroundColor: 'white',
          borderTopWidth: 0,
        }}
      >
        <TabItem
          id="resources"
          renderIcon={() =>
            Platform.OS === 'ios'
              ? <Ionicons name="md-compass" size={32} color="tomato" />
              : <Ionicons
                name="ios-locate"
                size={32}
                color="tomato"
                />}
        >
          <StackNavigation
            id="resources"
            initialRoute={Router.getRoute('resources')}
          />
        </TabItem>
        <TabItem
          id="snap"
          renderIcon={() =>
            <Ionicons
              name="ios-nutrition-outline"
              size={32}
              color="tomato"
            />}
        >
          <StackNavigation
            id="snap"
            initialRoute={Router.getRoute('snap')}
          />
        </TabItem>
        <TabItem
          id="wic"
          renderIcon={() =>
            <Ionicons
              name="ios-woman-outline"
              size={32}
              color="tomato"
            />}
        >
          <StackNavigation
            id="wic"
            initialRoute={Router.getRoute('wic')}
          />
        </TabItem>
      </TabNavigation>
    );
  }
};
