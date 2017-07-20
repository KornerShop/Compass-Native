import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
} from '@expo/ex-navigation';
import { Platform, StyleSheet } from 'react-native';
import Router from './Router';

const styles = StyleSheet.create({
  selectedIconColor: {
    color: '#21CFBF',
  },
  unselectedIconColor: {
    color: 'tomato',
  },
});

export default class RootNavigation extends Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

  constructor() {
    super();
    this.renderIcon = this.renderIcon.bind(this);
  }

  renderIcon(icon, isSelected) {
    return (
      <Ionicons
        name={icon}
        size={32}
        style={[
          isSelected
            ? styles.selectedIconColor
            : styles.unselectedIconColor,
        ]}
      />
    );
  }

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
          renderIcon={isSelected =>
            this.renderIcon('md-compass', !!isSelected)}
        >
          <StackNavigation
            id="resources"
            initialRoute={Router.getRoute('resources')}
          />
        </TabItem>
        <TabItem
          id="snap"
          renderIcon={isSelected =>
            this.renderIcon('ios-nutrition-outline', !!isSelected)}
        >
          <StackNavigation
            id="snap"
            initialRoute={Router.getRoute('snap')}
          />
        </TabItem>
        <TabItem
          id="wic"
          renderIcon={isSelected =>
            this.renderIcon('ios-woman-outline', !!isSelected)}
        >
          <StackNavigation
            id="wic"
            initialRoute={Router.getRoute('wic')}
          />
        </TabItem>
      </TabNavigation>
    );
  }
}
